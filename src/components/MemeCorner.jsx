import React, { useState, useEffect, useRef } from 'react';
import { Download, Sliders, Type, RefreshCw, Sparkles, AlertCircle } from 'lucide-react';

import meme1 from '../assets/meme1.png';
import meme2 from '../assets/meme2.png';
import meme3 from '../assets/meme3.png';
import meme4 from '../assets/meme4.png';

const templates = [
  {
    id: 'meme1',
    name: 'Cooking up Features',
    src: meme1,
    presets: [
      { top: 'ME COOKING UP A NEW FEATURE AT 3 AM', bottom: 'HOPING IT STICKS TOGETHER' },
      { top: 'EXPLAINING MY CODE STRUCTURE TO MOM', bottom: 'IT IS A BIT MESSY BUT IT WORKS' },
      { top: 'PUTTING TOGETHER 10 DIFFERENT APIs', bottom: 'AND HOPING THEY COLLABORATE' }
    ]
  },
  {
    id: 'meme2',
    name: 'Juice Bar Smile',
    src: meme2,
    presets: [
      { top: 'WHEN THE CODE COMPILES', bottom: 'ON THE FIRST TRY' },
      { top: 'CLIENT: "IS IT DONE?"', bottom: 'ME: "YES, ABSOLUTELY" (it is not done)' },
      { top: 'ME LOOKING AT MY COFFEE', bottom: 'AFTER 2 HOURS OF SLEEP' }
    ]
  },
  {
    id: 'meme3',
    name: 'Hair in the Wind',
    src: meme3,
    presets: [
      { top: 'RUNNING TO SHUT DOWN AWS', bottom: 'BEFORE THE BILLING CYCLE HITS' },
      { top: 'WHEN I CLICK "GIT PUSH ORIGIN MAIN --FORCE"', bottom: 'AND THE BUILD ACTUALLY SUCCEEDS' },
      { top: 'WAKING UP AT 12 PM', bottom: 'THINKING I AM EARLY FOR THE STANDUP' }
    ]
  },
  {
    id: 'meme4',
    name: 'Productivity & Back Pain',
    src: meme4,
    presets: [
      { top: 'CAUGHT BETWEEN', bottom: 'PRODUCTIVITY & BACK PAIN' },
      { top: 'WORKING FROM BED FOR "JUST 10 MINS"', bottom: '5 HOURS LATER IN THIS EXACT POSITION' },
      { top: 'ME DISCOVERING A BUG IN PRODUCTION', bottom: 'BUT I AM ALREADY TOO COZY TO CARE' }
    ]
  }
];

const MemeCorner = () => {
  const [selectedTemplateIdx, setSelectedTemplateIdx] = useState(0);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [fontSize, setFontSize] = useState(36);
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [outlineColor, setOutlineColor] = useState('#000000');
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef(null);

  const currentTemplate = templates[selectedTemplateIdx];

  // Helper to load presets
  const applyPreset = (preset) => {
    setTopText(preset.top);
    setBottomText(preset.bottom);
  };

  // Reset to default preset
  const handleReset = () => {
    if (currentTemplate.presets.length > 0) {
      applyPreset(currentTemplate.presets[0]);
    } else {
      setTopText('');
      setBottomText('');
    }
    setFontSize(36);
    setTextColor('#FFFFFF');
    setOutlineColor('#000000');
  };

  // Apply default preset on load or template switch
  useEffect(() => {
    if (currentTemplate) {
      applyPreset(currentTemplate.presets[0]);
    }
  }, [selectedTemplateIdx]);

  // Canvas drawing logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    setIsLoading(true);

    const img = new Image();
    img.src = currentTemplate.src;
    img.onload = () => {
      // Set canvas dimension based on image
      canvas.width = img.naturalWidth || 600;
      canvas.height = img.naturalHeight || 800;

      // Clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Font Setup
      ctx.font = `bold ${fontSize}px Impact, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillStyle = textColor;
      ctx.strokeStyle = outlineColor;
      ctx.lineWidth = Math.max(3, fontSize / 7);
      ctx.lineJoin = 'miter';
      ctx.miterLimit = 2;

      // Text wrapping drawer helper
      const drawTextLine = (text, x, y, maxWidth, lineHeight, isTopText) => {
        const words = text.split(' ');
        let line = '';
        const lines = [];

        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          const testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
          } else {
            line = testLine;
          }
        }
        lines.push(line);

        let currentY = y;
        if (!isTopText) {
          // If drawing bottom text, draw from bottom up to avoid clipping off-screen
          currentY = y - (lines.length - 1) * lineHeight;
        }

        for (let i = 0; i < lines.length; i++) {
          const trimmed = lines[i].trim();
          ctx.strokeText(trimmed, x, currentY);
          ctx.fillText(trimmed, x, currentY);
          currentY += lineHeight;
        }
      };

      const padding = 24;
      const wrapWidth = canvas.width - padding * 2;
      const lineHeight = fontSize + 6;

      // Draw Top Text
      if (topText) {
        ctx.textBaseline = 'top';
        drawTextLine(topText.toUpperCase(), canvas.width / 2, padding, wrapWidth, lineHeight, true);
      }

      // Draw Bottom Text
      if (bottomText) {
        ctx.textBaseline = 'bottom';
        drawTextLine(
          bottomText.toUpperCase(),
          canvas.width / 2,
          canvas.height - padding,
          wrapWidth,
          lineHeight,
          false
        );
      }

      setIsLoading(false);
    };

    img.onerror = () => {
      setIsLoading(false);
    };
  }, [currentTemplate, topText, bottomText, fontSize, textColor, outlineColor]);

  // Download Handler
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `drishti-meme-${currentTemplate.id}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <section id="memes" className="section container">
      <h2>
        <span className="highlight">07.</span> Meme Corner
      </h2>
      <p style={{ fontSize: '1.05rem', maxWidth: '700px', marginBottom: '2.5rem', marginTop: '-0.5rem', color: 'var(--color-text-secondary)' }}>
        A collection of custom memes starring Drishti in developer situations. Select a template, customize the captions, and download your favorite creation!
      </p>

      <div className="meme-workspace">
        {/* Left pane: Canvas Preview & Template Selector */}
        <div className="meme-preview-panel">
          <div className="meme-canvas-container">
            {isLoading && (
              <div className="meme-loader">
                <span className="spinner"></span>
              </div>
            )}
            <canvas ref={canvasRef} className="meme-canvas" />
          </div>

          <div className="meme-template-grid">
            {templates.map((tpl, idx) => (
              <button
                key={tpl.id}
                onClick={() => setSelectedTemplateIdx(idx)}
                className={`meme-template-btn ${selectedTemplateIdx === idx ? 'active' : ''}`}
                title={tpl.name}
              >
                <div className="meme-template-thumb" style={{ backgroundImage: `url(${tpl.src})` }}>
                  <span className="meme-template-badge">{idx + 1}</span>
                </div>
                <span className="meme-template-name">{tpl.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right pane: Controls */}
        <div className="meme-controls-panel">
          <div className="control-group-title">
            <Sliders size={18} className="highlight" />
            <h3>Meme Editor</h3>
          </div>

          {/* Preset Captions list */}
          <div className="meme-control-section">
            <span className="control-label">Quick Presets</span>
            <div className="meme-presets-list">
              {currentTemplate.presets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => applyPreset(preset)}
                  className="preset-btn-item"
                >
                  <Sparkles size={12} className="highlight" />
                  <span className="preset-text-preview">"{preset.top || '...'}"</span>
                </button>
              ))}
            </div>
          </div>

          {/* Text Inputs */}
          <div className="meme-control-section">
            <div className="control-header-with-icon">
              <Type size={16} />
              <label htmlFor="top-text-input" className="control-label">Top Text</label>
            </div>
            <input
              id="top-text-input"
              type="text"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              placeholder="ENTER TOP TEXT"
              className="meme-input"
            />
          </div>

          <div className="meme-control-section">
            <div className="control-header-with-icon">
              <Type size={16} />
              <label htmlFor="bottom-text-input" className="control-label">Bottom Text</label>
            </div>
            <input
              id="bottom-text-input"
              type="text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              placeholder="ENTER BOTTOM TEXT"
              className="meme-input"
            />
            {currentTemplate.id === 'meme4' && (
              <div className="meme-warning-box">
                <AlertCircle size={14} />
                <span>Note: This image already has original text, but you can layer more on top!</span>
              </div>
            )}
          </div>

          {/* Typography Styling Controls */}
          <div className="meme-control-row">
            <div className="meme-control-section half-width">
              <label htmlFor="font-size-slider" className="control-label">Font Size ({fontSize}px)</label>
              <input
                id="font-size-slider"
                type="range"
                min="16"
                max="64"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="meme-slider"
              />
            </div>

            <div className="meme-control-section half-width">
              <label className="control-label">Text Colors</label>
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                {['#FFFFFF', '#FFEB3B', '#FF5722', '#00E676', '#00B0FF'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setTextColor(color)}
                    className={`color-dot ${textColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select ${color} text color`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Stroke Outline Controls */}
          <div className="meme-control-section">
            <label className="control-label">Stroke Outline Color</label>
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
              {['#000000', '#374151', '#FFFFFF', '#D50000', '#1A237E'].map((color) => (
                <button
                  key={color}
                  onClick={() => setOutlineColor(color)}
                  className={`color-dot ${outlineColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color, border: color === '#FFFFFF' ? '1px solid #ddd' : 'none' }}
                  aria-label={`Select ${color} outline color`}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="meme-action-buttons">
            <button onClick={handleReset} className="btn btn-secondary flex-grow-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <RefreshCw size={16} /> Reset Editor
            </button>
            <button onClick={handleDownload} className="btn btn-primary flex-grow-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Download size={16} /> Download Meme
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemeCorner;
