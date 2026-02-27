import { useState, useCallback, useMemo } from "react";
import { validateSVG, replacePlaceholders, detectPlaceholders, downloadFile, downloadAsPNG, readFileAsText } from "../utils/svgUtils";

const INITIAL_FIELDS = { name: "", title: "", description: "" };

export function useSVGEditor() {
  const [originalSVG, setOriginalSVG] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [uploadError, setUploadError] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState("svg");
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [detectedPlaceHoldersList, setDetectedPlaceHoldersList] = useState([]);

  const modifiedSVG = useMemo(() => {
    if (!originalSVG) return null;
    return replacePlaceholders(originalSVG, fields);
  }, [originalSVG, fields]);

  const handleFileUpload = useCallback(async (file) => {
    setUploadError(null);

    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".svg")) {
      setUploadError("Please upload a valid .svg file.");
      return;
    }

    try {
      const content = await readFileAsText(file);
      const { valid, message } = validateSVG(content);

      if (!valid) {
        setUploadError(message);
        return;
      }
      const { normalArray, error } = detectPlaceholders(content);
      if (error) {
        setUploadError(error);
        return;
      }
      setDetectedPlaceHoldersList(normalArray);
      setOriginalSVG(content);
      setFileName(file.name);
    } catch (err) {
      setUploadError(err.message || "Failed to read file.");
    }
  }, []);

  const updateField = useCallback((key, value) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetEditor = useCallback(() => {
    setOriginalSVG(null);
    setFileName("");
    setFields(INITIAL_FIELDS);
    setUploadError(null);
    setDownloadSuccess(false);
  }, []);

  const handleDownload = useCallback(async () => {
    if (!modifiedSVG) return;

    setIsDownloading(true);
    setDownloadSuccess(false);

    const baseName = fileName.replace(/\.svg$/i, "") || "edited";

    try {
      if (downloadFormat === "svg") {
        downloadFile(modifiedSVG, `${baseName}-edited.svg`);
        setDownloadSuccess(true);
      } else {
        await downloadAsPNG(modifiedSVG, `${baseName}-edited.png`);
        setDownloadSuccess(true);
      }
    } catch (err) {
      setUploadError(`Download failed: ${err.message}`);
    } finally {
      setIsDownloading(false);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }
  }, [modifiedSVG, fileName, downloadFormat]);

  return {
    originalSVG,
    modifiedSVG,
    fileName,
    fields,
    uploadError,
    isDownloading,
    downloadFormat,
    downloadSuccess,
    hasFile: !!originalSVG,
    detectedPlaceHoldersList,
    handleFileUpload,
    updateField,
    resetEditor,
    handleDownload,
    setDownloadFormat,
    setUploadError,
  };
}
