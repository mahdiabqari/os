"use client";
import { useState, useEffect, useRef } from "react";

export default function Windows12Prototype() {
  // State management
  const [loading, setLoading] = useState(true);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState({ open: false, x: 0, y: 0 });
  const [windows, setWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [desktopIcons, setDesktopIcons] = useState([
    { id: 1, name: "Documents", icon: "📁", x: 20, y: 20 },
    { id: 2, name: "Pictures", icon: "🖼️", x: 20, y: 100 },
    { id: 3, name: "Music", icon: "🎵", x: 20, y: 180 },
    { id: 4, name: "Videos", icon: "🎬", x: 20, y: 260 },
  ]);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notification, setNotification] = useState({
    show: false,
    title: "",
    message: "",
  });

  // Refs
  const desktopRef = useRef(null);
  const startMenuRef = useRef(null);

  // Close loading screen after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      showNotification("Welcome", "Your OS Prototype is ready!");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close start menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        startMenuRef.current &&
        !startMenuRef.current.contains(event.target)
      ) {
        const startButton = event.target.closest(".start-btn");
        if (!startButton) {
          setStartMenuOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setContextMenu({ open: false, x: 0, y: 0 });
    };

    if (contextMenu.open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [contextMenu.open]);

  // Show notification
  const showNotification = (title, message) => {
    setNotification({ show: true, title, message });
    setTimeout(
      () => setNotification({ show: false, title: "", message: "" }),
      4000
    );
  };

  // Open app window
  const openApp = (app) => {
    const newWindow = {
      id: Date.now(),
      title: app.name,
      type: app.type,
      minimized: false,
      maximized: false,
      x: 100 + windows.length * 30,
      y: 100 + windows.length * 30,
      width: 800,
      height: 600,
      zIndex: windows.length + 1,
    };
    setWindows((prev) => [...prev, newWindow]);
    setActiveWindow(newWindow.id);
    setStartMenuOpen(false);
  };

  // Close app window
  const closeApp = (id) => {
    setWindows((prev) => prev.filter((window) => window.id !== id));
    if (activeWindow === id) {
      setActiveWindow(windows.length > 1 ? windows[0].id : null);
    }
  };

  // Minimize app window
  const minimizeApp = (id) => {
    setWindows((prev) =>
      prev.map((window) =>
        window.id === id ? { ...window, minimized: true } : window
      )
    );
  };

  // Maximize/restore app window
  const maximizeApp = (id) => {
    setWindows((prev) =>
      prev.map((window) =>
        window.id === id ? { ...window, maximized: !window.maximized } : window
      )
    );
  };

  // Focus window
  const focusWindow = (id) => {
    setActiveWindow(id);
    setWindows((prev) =>
      prev.map((window) => ({
        ...window,
        zIndex: window.id === id ? prev.length + 1 : window.zIndex,
      }))
    );
  };

  // Handle desktop right-click
  const handleDesktopRightClick = (e) => {
    e.preventDefault();
    setContextMenu({
      open: true,
      x: e.clientX,
      y: e.clientY,
    });
    setSelectedIcon(null);
  };

  // Handle desktop click
  const handleDesktopClick = () => {
    setSelectedIcon(null);
    setContextMenu({ open: false, x: 0, y: 0 });
  };

  // App definitions
  const apps = [
    { id: 1, name: "File Explorer", type: "explorer", icon: "📁" },
    { id: 2, name: "Settings", type: "settings", icon: "⚙️" },
    { id: 3, name: "Browser", type: "browser", icon: "🌐" },
    { id: 4, name: "Notepad", type: "notepad", icon: "📝" },
    { id: 5, name: "Calculator", type: "calculator", icon: "🧮" },
    { id: 6, name: "Paint", type: "paint", icon: "🎨" },
  ];

  // Render app content based on type
  const renderAppContent = (app) => {
    switch (app.type) {
      case "explorer":
        return (
          <div className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <button className="px-3 py-1 rounded border border-gray-300 text-sm">
                Back
              </button>
              <button className="px-3 py-1 rounded border border-gray-300 text-sm">
                Forward
              </button>
              <div className="flex-1 bg-gray-100 rounded px-3 py-1 text-sm text-gray-600">
                C:\Users\Windows12\Documents
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[
                "Document1.docx",
                "Spreadsheet.xlsx",
                "Presentation.pptx",
                "Image.jpg",
                "Video.mp4",
                "Music.mp3",
              ].map((file, index) => (
                <div
                  key={index}
                  className="text-center cursor-pointer hover:bg-gray-100 rounded p-2"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    {file.includes(".doc")
                      ? "📄"
                      : file.includes(".xls")
                      ? "📊"
                      : file.includes(".pptx")
                      ? "📽️"
                      : file.includes(".jpg")
                      ? "🖼️"
                      : file.includes(".mp4")
                      ? "🎬"
                      : "🎵"}
                  </div>
                  <div className="text-xs truncate">{file}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case "settings":
        const [brightness, setBrightness] = useState(80);
        const [volume, setVolume] = useState(70);
        const [wifiEnabled, setWifiEnabled] = useState(true);
        const [bluetoothEnabled, setBluetoothEnabled] = useState(false);

        return (
          <div className="h-full">
            <div className="settings-grid h-full">
              <div className="settings-sidebar">
                <div className="setting-item active">System</div>
                <div className="setting-item">Display</div>
                <div className="setting-item">Sound</div>
                <div className="setting-item">Network</div>
                <div className="setting-item">Personalization</div>
                <div className="setting-item">Apps</div>
                <div className="setting-item">Accounts</div>
                <div className="setting-item">Privacy</div>
              </div>
              <div className="settings-content">
                <h2 className="text-xl font-semibold mb-6">System Settings</h2>

                <div className="space-y-6">
                  <div className="setting-panel">
                    <h3 className="font-medium mb-4">Display</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Brightness</span>
                        <div className="w-48 relative">
                          <div className="slider">
                            <div
                              className="slider-fill"
                              style={{ width: `${brightness}%` }}
                            ></div>
                            <div
                              className="slider-knob"
                              style={{ left: `${brightness}%` }}
                              onMouseDown={(e) => {
                                const slider = e.target.parentElement;
                                const rect = slider.getBoundingClientRect();
                                const handleMove = (moveEvent) => {
                                  const percent = Math.min(
                                    100,
                                    Math.max(
                                      0,
                                      ((moveEvent.clientX - rect.left) /
                                        rect.width) *
                                        100
                                    )
                                  );
                                  setBrightness(percent);
                                };
                                const handleUp = () => {
                                  document.removeEventListener(
                                    "mousemove",
                                    handleMove
                                  );
                                  document.removeEventListener(
                                    "mouseup",
                                    handleUp
                                  );
                                };
                                document.addEventListener(
                                  "mousemove",
                                  handleMove
                                );
                                document.addEventListener("mouseup", handleUp);
                              }}
                            ></div>
                          </div>
                        </div>
                        <span className="w-8 text-right">
                          {Math.round(brightness)}%
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Volume</span>
                        <div className="w-48 relative">
                          <div className="slider">
                            <div
                              className="slider-fill"
                              style={{ width: `${volume}%` }}
                            ></div>
                            <div
                              className="slider-knob"
                              style={{ left: `${volume}%` }}
                              onMouseDown={(e) => {
                                const slider = e.target.parentElement;
                                const rect = slider.getBoundingClientRect();
                                const handleMove = (moveEvent) => {
                                  const percent = Math.min(
                                    100,
                                    Math.max(
                                      0,
                                      ((moveEvent.clientX - rect.left) /
                                        rect.width) *
                                        100
                                    )
                                  );
                                  setVolume(percent);
                                };
                                const handleUp = () => {
                                  document.removeEventListener(
                                    "mousemove",
                                    handleMove
                                  );
                                  document.removeEventListener(
                                    "mouseup",
                                    handleUp
                                  );
                                };
                                document.addEventListener(
                                  "mousemove",
                                  handleMove
                                );
                                document.addEventListener("mouseup", handleUp);
                              }}
                            ></div>
                          </div>
                        </div>
                        <span className="w-8 text-right">
                          {Math.round(volume)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="setting-panel">
                    <h3 className="font-medium mb-4">Network & Connectivity</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Wi-Fi</span>
                        <div
                          className={`toggle-switch ${
                            wifiEnabled ? "active" : ""
                          }`}
                          onClick={() => setWifiEnabled(!wifiEnabled)}
                        >
                          <div className="toggle-knob"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Bluetooth</span>
                        <div
                          className={`toggle-switch ${
                            bluetoothEnabled ? "active" : ""
                          }`}
                          onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
                        >
                          <div className="toggle-knob"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="setting-panel">
                    <h3 className="font-medium mb-4">Personalization</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        "#0067c0",
                        "#107c10",
                        "#e81123",
                        "#ffb900",
                        "#881798",
                        "#00b7c3",
                      ].map((color, index) => (
                        <div
                          key={index}
                          className="w-12 h-12 rounded-lg cursor-pointer border-2 border-transparent hover:border-gray-300"
                          style={{ backgroundColor: color }}
                          onClick={() =>
                            showNotification(
                              "Theme Updated",
                              `Applied ${color} theme`
                            )
                          }
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "browser":
        return (
          <div className="h-full flex flex-col">
            <div className="flex items-center gap-2 p-3 border-b border-gray-200">
              <button className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-xs">
                ←
              </button>
              <button className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-xs">
                →
              </button>
              <button className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-xs">
                ↻
              </button>
              <div className="flex-1 bg-gray-100 rounded-full px-4 py-1 text-sm">
                https://windows12.web
              </div>
            </div>
            <div className="flex-1 p-4 bg-gray-50">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">
                  Welcome to Windows 12 Web
                </h1>
                <div className="grid grid-cols-3 gap-6 mb-8">
                  {[
                    "News",
                    "Weather",
                    "Stocks",
                    "Sports",
                    "Entertainment",
                    "Technology",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-semibold mb-2">{item}</h3>
                      <p className="text-sm text-gray-600">
                        Latest updates and stories...
                      </p>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold mb-4">
                    Featured Content
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Experience the future of computing with this interactive
                    Windows 12 prototype. Explore the modern interface, try out
                    the settings, and see what's possible in the browser.
                  </p>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    onClick={() =>
                      showNotification(
                        "Feature",
                        "This is a browser mockup - real navigation not implemented"
                      )
                    }
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-6 text-center">
            <div className="text-4xl mb-4">{app.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{app.title}</h2>
            <p className="text-gray-600">
              This is a placeholder for the {app.title} application.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              onClick={() =>
                showNotification(app.title, `${app.title} feature coming soon!`)
              }
            >
              Explore Features
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 relative overflow-hidden">
      {/* Loading Screen */}
      {loading && (
        <div className="windows-loading">
          <div className="loading-logo">
            <svg viewBox="0 0 24 24" fill="white" className="w-20 h-20">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </div>
          <div className="loading-dots">
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
          </div>
        </div>
      )}

      {/* Desktop */}
      <div
        ref={desktopRef}
        className="desktop-icons w-full h-full absolute inset-0"
        onClick={handleDesktopClick}
        onContextMenu={handleDesktopRightClick}
      >
        {/* Desktop Icons */}
        {desktopIcons.map((icon) => (
          <div
            key={icon.id}
            className="desktop-icon absolute"
            style={{ left: icon.x, top: icon.y }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIcon(icon.id);
            }}
            onDoubleClick={() => openApp({ name: icon.name, type: "explorer" })}
          >
            <div
              className={`icon-image ${
                selectedIcon === icon.id ? "ring-2 ring-blue-400" : ""
              }`}
            >
              {icon.icon}
            </div>
            <div className="icon-name">{icon.name}</div>
          </div>
        ))}

        {/* App Windows */}
        {windows.map((window) => (
          <div
            key={window.id}
            className={`window ${
              activeWindow === window.id ? "ring-1 ring-blue-400" : ""
            } ${window.minimized ? "hidden" : ""}`}
            style={{
              left: window.maximized ? 0 : window.x,
              top: window.maximized ? 0 : window.y,
              width: window.maximized ? "100%" : window.width,
              height: window.maximized ? "calc(100% - 48px)" : window.height,
              zIndex: window.zIndex,
            }}
            onClick={() => focusWindow(window.id)}
          >
            <div className="window-header">
              <div className="window-title">{window.title}</div>
              <div className="window-controls">
                <button
                  className="window-btn minimize"
                  onClick={(e) => {
                    e.stopPropagation();
                    minimizeApp(window.id);
                  }}
                ></button>
                <button
                  className="window-btn maximize"
                  onClick={(e) => {
                    e.stopPropagation();
                    maximizeApp(window.id);
                  }}
                ></button>
                <button
                  className="window-btn close"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeApp(window.id);
                  }}
                ></button>
              </div>
            </div>
            <div className="window-content">{renderAppContent(window)}</div>
          </div>
        ))}
      </div>

      {/* Taskbar */}
      <div className="taskbar">
        <button
          className="start-btn"
          onClick={() => setStartMenuOpen(!startMenuOpen)}
        >
          🪟
        </button>

        <div className="taskbar-apps">
          {windows.map((window) => (
            <div
              key={window.id}
              className={`taskbar-app ${
                activeWindow === window.id ? "active" : ""
              }`}
              onClick={() => {
                if (window.minimized) {
                  setWindows((prev) =>
                    prev.map((w) =>
                      w.id === window.id ? { ...w, minimized: false } : w
                    )
                  );
                }
                focusWindow(window.id);
              }}
            >
              {window.title.charAt(0)}
            </div>
          ))}
        </div>

        <div className="system-tray">
          <div
            className="tray-icon"
            onClick={() =>
              showNotification("Wi-Fi", "Wireless network connected")
            }
          >
            📶
          </div>
          <div
            className="tray-icon"
            onClick={() => showNotification("Sound", "Volume: 70%")}
          >
            🔈
          </div>
          <div
            className="tray-icon"
            onClick={() => showNotification("Battery", "Battery: 87%")}
          >
            🔋
          </div>
        </div>
      </div>

      {/* Start Menu */}
      <div
        ref={startMenuRef}
        className={`start-menu ${startMenuOpen ? "open" : ""}`}
      >
        <div className="start-search">
          <input
            type="text"
            placeholder="Type here to search..."
            className="search-bar"
          />
        </div>
        <div className="app-grid">
          {apps.map((app) => (
            <div key={app.id} className="app-tile" onClick={() => openApp(app)}>
              <div className="app-icon">{app.icon}</div>
              <div className="app-name">{app.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu.open && (
        <div
          className="context-menu open"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <div className="context-item">🆕 New Folder</div>
          <div className="context-item">📊 Display Settings</div>
          <div className="context-item">🎨 Personalize</div>
          <div className="context-item">👀 Show Desktop</div>
          <div className="context-item">🔍 Search</div>
        </div>
      )}

      {/* Notification */}
      <div className={`notification ${notification.show ? "show" : ""}`}>
        <div className="notification-header">
          <div className="notification-title">{notification.title}</div>
          <button
            className="notification-close"
            onClick={() =>
              setNotification({ show: false, title: "", message: "" })
            }
          >
            ×
          </button>
        </div>
        <div className="notification-message">{notification.message}</div>
      </div>
    </div>
  );
}
