"use client";

import { useRef, useCallback, useEffect } from "react";
import { Bold, Italic, Heading2, Heading3, List, ListOrdered, Minus } from "lucide-react";

interface SimpleEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function SimpleEditor({
  value,
  onChange,
  placeholder = "",
  minHeight = "200px",
}: SimpleEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  // Track whether the change came from user typing inside the editor
  const isInternalChange = useRef(false);

  // Only set innerHTML when value changes externally (not from user typing)
  useEffect(() => {
    if (isInternalChange.current) {
      isInternalChange.current = false;
      return;
    }
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const execCommand = useCallback(
    (command: string, val?: string) => {
      editorRef.current?.focus();
      document.execCommand(command, false, val);
      // Read back content after command
      if (editorRef.current) {
        isInternalChange.current = true;
        onChange(editorRef.current.innerHTML);
      }
    },
    [onChange]
  );

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      isInternalChange.current = true;
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault();
      const text = e.clipboardData.getData("text/plain");
      // Convert plain text newlines to <p> for paragraph preservation
      const html = text
        .split(/\n\n+/)
        .map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`)
        .join("");
      document.execCommand("insertHTML", false, html);
      if (editorRef.current) {
        isInternalChange.current = true;
        onChange(editorRef.current.innerHTML);
      }
    },
    [onChange]
  );

  const buttons = [
    { icon: <Bold className="w-4 h-4" />, command: "bold", title: "Negrita" },
    { icon: <Italic className="w-4 h-4" />, command: "italic", title: "Cursiva" },
    { icon: <Heading2 className="w-4 h-4" />, command: "formatBlock", value: "<h3>", title: "Subtítulo" },
    { icon: <Heading3 className="w-4 h-4" />, command: "formatBlock", value: "<h4>", title: "Subtítulo Menor" },
    { icon: <List className="w-4 h-4" />, command: "insertUnorderedList", title: "Lista" },
    { icon: <ListOrdered className="w-4 h-4" />, command: "insertOrderedList", title: "Lista Numerada" },
    { icon: <Minus className="w-4 h-4" />, command: "insertHorizontalRule", title: "Línea" },
  ];

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-luther-blue focus-within:border-luther-blue">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 bg-gray-50 border-b border-gray-200">
        {buttons.map((btn, i) => (
          <button
            key={i}
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              execCommand(btn.command, btn.value);
            }}
            className="p-1.5 rounded hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
            title={btn.title}
          >
            {btn.icon}
          </button>
        ))}
        <div className="h-5 w-px bg-gray-300 mx-1" />
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            execCommand("removeFormat");
          }}
          className="px-2 py-1 rounded hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition-colors text-xs font-medium"
          title="Limpiar formato"
        >
          Limpiar
        </button>
      </div>

      {/* Editor area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onPaste={handlePaste}
        data-placeholder={placeholder}
        className="px-3 py-2 outline-none prose prose-sm max-w-none [&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-gray-400"
        style={{ minHeight }}
      />
    </div>
  );
}
