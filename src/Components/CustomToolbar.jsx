import React from "react";

const CustomToolbar = () => (
  <div id="custom-toolbar">
    <span className="ql-formats">
      <select className="ql-header" defaultValue="">
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="">Normal</option>
      </select>
      <select className="ql-font"></select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-underline"></button>
      <button className="ql-strike"></button>
      <button className="ql-blockquote"></button>
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered"></button>
      <button className="ql-list" value="bullet"></button>
      <button className="ql-indent" value="-1"></button>
      <button className="ql-indent" value="+1"></button>
    </span>
    <span className="ql-formats">
      <button className="ql-link"></button>
      <button className="ql-image"></button>
      <button className="ql-video"></button>
    </span>
    <span className="ql-formats">
      <button className="ql-insertTable">
        <svg viewBox="0 0 18 18">
          <rect className="ql-stroke" height="12" width="12" x="3" y="3"></rect>
          <line className="ql-stroke" x1="3" x2="15" y1="7" y2="7"></line>
          <line className="ql-stroke" x1="3" x2="15" y1="11" y2="11"></line>
          <line className="ql-stroke" x1="7" x2="7" y1="3" y2="15"></line>
          <line className="ql-stroke" x1="11" x2="11" y1="3" y2="15"></line>
        </svg>
      </button>
    </span>
    <span className="ql-formats">
      <button className="ql-clean"></button>
    </span>
  </div>
);

export default CustomToolbar;