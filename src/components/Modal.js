"use client";
export default function Modal({ isOpen, onClose, children, title }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {title && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>{title}</h2>
            <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.03)", color: "#a0a0b8", fontSize: 20 }}>✕</button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
