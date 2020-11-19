import React from 'react';

let styles = {
  height: "64px",
  margin: 0,
  color: "#ffffff",
  display: "flex",
  alignItems: "center",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 999,
  width: "100vw",
  paddingLeft: "12px"
}

const BackImage = () => (
  <div style={styles} onClick={() => window.history.back()}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path d="M17.25 21.56l-.93.94-9.1-9.32a1.71 1.71 0 010-2.36l9.1-9.32.93.94-9.09 9.32a.34.34 0 000 .48l9.09 9.32z" fill="#ffffff" fillRule="nonzero" />
    </svg>
  </div>
)

export default BackImage;