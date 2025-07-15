import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as mammoth from "mammoth";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import "../styles/document.css";

const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-font">
      <option value="sans-serif">Sans Serif</option>
      <option value="serif">Serif</option>
      <option value="monospace">Monospace</option>
    </select>
    <select className="ql-size">
      <option value="small">Small</option>
      <option value="normal">Normal</option>
      <option value="large">Large</option>
      <option value="huge">Huge</option>
    </select>
    <select className="ql-align">
      <option value=""></option>
      <option value="center">Center</option>
      <option value="right">Right</option>
      <option value="justify">Justify</option>
    </select>
    <button className="ql-bold" />
    <button className="ql-italic" />
    <button className="ql-underline" />
    <button className="ql-strike" />
    <button className="ql-list" value="ordered" />
    <button className="ql-list" value="bullet" />
    <button className="ql-link" />
    <button className="ql-image" />
    <button className="ql-clean" />
  </div>
);

const DocumentEditor = () => {
  const [content, setContent] = useState("");
  const quillRef = useRef(null);

  const modules = {
    toolbar: { container: "#toolbar" },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "list",
    "link",
    "image",
  ];

  const handleSave = () => {
    const doc = new Document({
      sections: [{ children: parseHtmlToDocx(content) }],
    });

    Packer.toBlob(doc).then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "document.docx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  const parseHtmlToDocx = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const elements = [];

    doc.body.childNodes.forEach((node) => {
      if (node.nodeName === "H3") {
        elements.push(
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            children: [new TextRun(node.textContent)],
          })
        );
      } else if (node.nodeName === "P") {
        elements.push(
          new Paragraph({ children: [new TextRun(node.textContent)] })
        );
      }
    });

    return elements;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.name.endsWith(".docx")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          mammoth
            .convertToHtml({ arrayBuffer: e.target.result })
            .then((result) => setContent(result.value))
            .catch((error) => console.error("Error reading .docx:", error));
        };
        reader.readAsArrayBuffer(file);
      } else if (file.name.endsWith(".txt")) {
        const reader = new FileReader();
        reader.onload = (e) => setContent(e.target.result);
        reader.readAsText(file);
      } else {
        alert("Unsupported file type. Please upload a .txt or .docx file.");
      }
    }
  };

  useEffect(() => {
    if (quillRef.current && content) {
      setContent(content);
    }
  }, [content]);

  return (
    <div className="document-editor">
      <div className="navbar">
        <h1>Document Editor</h1>
        <button onClick={handleSave} className="save-button">
          Save Document
        </button>
      </div>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".txt,.docx"
        style={{ marginBottom: "20px" }}
      />
      <CustomToolbar />
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        placeholder="Start typing your document..."
        ref={quillRef}
      />
    </div>
  );
};

export default DocumentEditor;
