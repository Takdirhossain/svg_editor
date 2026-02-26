export function validateSVG(content) {
  if (!content || typeof content !== "string") {
    return { valid: false, message: "File content is empty or invalid." };
  }

  const trimmed = content.trim();

  if (!trimmed.includes("<svg") || !trimmed.includes("</svg>")) {
    return {
      valid: false,
      message: "File does not appear to be a valid SVG (missing <svg> tags).",
    };
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "image/svg+xml");
    const parseError = doc.querySelector("parsererror");
    if (parseError) {
      return {
        valid: false,
        message: "SVG parsing error: " + parseError.textContent.slice(0, 100),
      };
    }
  } catch {
    return { valid: false, message: "Failed to parse SVG content." };
  }

  return { valid: true, message: "Valid SVG file." };
}

export function replacePlaceholders(svgContent, values) {
  if (!svgContent) return "";

  let modified = svgContent;

  const replacements = {
    "{{name}}": values.name ?? "",
    "{{title}}": values.title ?? "",
    "{{description}}": values.description ?? "",
  };

  Object.entries(replacements).forEach(([placeholder, value]) => {
    modified = modified.split(placeholder).join(value);
  });

  return modified;
}

export function detectPlaceholders(svgContent) {

  if (!svgContent) return { detected: [], error: "SVG content is empty" };

  const PLACEHOLDERS = ["{{name}}", "{{title}}", "{{description}}"];
  const detected = PLACEHOLDERS.filter((p) => svgContent.includes(p));
  const normalArray = detected.map(p => p.replace("{{", "").replace("}}", ""));
 

  if (detected.length === 0) {
    return { detected: [], error: "No placeholders detected ({{name}}, {{title}}, {{description}})" };
  }

  return { normalArray, error: null };
}

export function downloadFile(content, filename, mimeType = "image/svg+xml") {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function downloadAsPNG(svgContent, filename, scale = 2) {
  return new Promise((resolve, reject) => {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
    const svgEl = svgDoc.querySelector("svg");

    if (!svgEl) {
      reject(new Error("No SVG element found."));
      return;
    }

    let width = parseInt(svgEl.getAttribute("width")) || 800;
    let height = parseInt(svgEl.getAttribute("height")) || 600;

    const viewBox = svgEl.getAttribute("viewBox");
    if (viewBox) {
      const parts = viewBox.split(/[\s,]+/);
      if (parts.length === 4) {
        width = parseFloat(parts[2]) || width;
        height = parseFloat(parts[3]) || height;
      }
    }

    const canvas = document.createElement("canvas");
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);

    const blob = new Blob([svgContent], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const img = new Image();

    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      canvas.toBlob((pngBlob) => {
        if (!pngBlob) {
          reject(new Error("Failed to generate PNG."));
          return;
        }
        const pngUrl = URL.createObjectURL(pngBlob);
        const a = document.createElement("a");
        a.href = pngUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(pngUrl);
        resolve();
      }, "image/png");
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load SVG as image."));
    };

    img.src = url;
  });
}

export function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.readAsText(file);
  });
}
