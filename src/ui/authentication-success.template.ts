export const authenticationSuccessTemplate = `
    <!doctype html>
      <html lang="en">
          <head>
              <meta charset="utf-8" />
              <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1"
              />
              <meta name="color-scheme" content="dark" />
              <meta name="robots" content="noindex, nofollow" />

              <title>Authentication successful | Envly CLI</title>

              <style>
                  :root {
                      color-scheme: dark;

                      --background: #08080d;
                      --card: rgba(18, 18, 28, 0.78);
                      --foreground: #fafafa;
                      --muted: #a1a1aa;
                      --border: rgba(255, 255, 255, 0.1);
                      --indigo: #6366f1;
                      --violet: #8b5cf6;
                      --pink: #f32aa4;
                      --success: #22c55e;
                  }

                  * {
                      box-sizing: border-box;
                      margin: 0;
                      padding: 0;
                  }

                  html {
                      min-height: 100%;
                  }

                  body {
                      min-height: 100vh;
                      min-height: 100dvh;

                      display: flex;
                      align-items: center;
                      justify-content: center;

                      overflow: hidden;
                      padding: 24px;

                      background-color: var(--background);
                      background-image:
                          linear-gradient(
                              to right,
                              rgba(255, 255, 255, 0.025) 1px,
                              transparent 1px
                          ),
                          linear-gradient(
                              to bottom,
                              rgba(255, 255, 255, 0.025) 1px,
                              transparent 1px
                          ),
                          radial-gradient(
                              ellipse 70% 55% at 50% 0%,
                              rgba(99, 102, 241, 0.24),
                              transparent 72%
                          ),
                          radial-gradient(
                              circle at 10% 75%,
                              rgba(243, 42, 164, 0.14),
                              transparent 30rem
                          ),
                          radial-gradient(
                              circle at 90% 70%,
                              rgba(139, 92, 246, 0.14),
                              transparent 28rem
                          );

                      background-position: center;
                      background-size:
                          52px 52px,
                          52px 52px,
                          auto,
                          auto,
                          auto;

                      color: var(--foreground);

                      font-family:
                          Inter,
                          ui-sans-serif,
                          system-ui,
                          -apple-system,
                          BlinkMacSystemFont,
                          "Segoe UI",
                          sans-serif;

                      text-rendering: optimizeLegibility;
                  }

                  body::before {
                      content: "";

                      position: fixed;
                      inset: 0;
                      z-index: -1;

                      pointer-events: none;

                      background: radial-gradient(
                          ellipse 55% 45% at 50% 50%,
                          rgba(99, 102, 241, 0.1),
                          transparent 72%
                      );
                  }

                  .container {
                      position: relative;
                      isolation: isolate;

                      width: 100%;
                      max-width: 560px;

                      overflow: hidden;
                      padding: 48px 40px 40px;

                      border: 1px solid var(--border);
                      border-radius: 28px;

                      background: var(--card);

                      box-shadow:
                          0 32px 80px -32px rgba(99, 102, 241, 0.5),
                          0 24px 64px -40px rgba(243, 42, 164, 0.7),
                          inset 0 1px 0 rgba(255, 255, 255, 0.05);

                      text-align: center;

                      backdrop-filter: blur(24px);
                      -webkit-backdrop-filter: blur(24px);
                  }

                  .container::before {
                      content: "";

                      position: absolute;
                      top: 0;
                      right: 12%;
                      left: 12%;

                      height: 1px;

                      background: linear-gradient(
                          90deg,
                          transparent,
                          rgba(243, 42, 164, 0.9),
                          rgba(99, 102, 241, 0.9),
                          transparent
                      );
                  }

                  .container::after {
                      content: "";

                      position: absolute;
                      z-index: -1;
                      top: -170px;
                      left: 50%;

                      width: 380px;
                      height: 300px;

                      transform: translateX(-50%);

                      border-radius: 50%;

                      background: radial-gradient(
                          circle,
                          rgba(243, 42, 164, 0.19),
                          rgba(99, 102, 241, 0.1) 45%,
                          transparent 70%
                      );

                      filter: blur(20px);
                      pointer-events: none;
                  }

                  .logo {
                      display: inline-flex;
                      align-items: center;
                      gap: 9px;

                      margin-bottom: 34px;

                      color: var(--foreground);

                      font-size: 22px;
                      font-weight: 800;
                      letter-spacing: -0.045em;
                      text-decoration: none;
                  }

                  .logo-mark {
                      position: relative;

                      width: 28px;
                      height: 28px;

                      display: inline-flex;
                      align-items: center;
                      justify-content: center;

                      border: 1px solid rgba(255, 255, 255, 0.14);
                      border-radius: 9px;

                      background: linear-gradient(
                          135deg,
                          rgba(99, 102, 241, 0.35),
                          rgba(243, 42, 164, 0.3)
                      );

                      box-shadow: 0 10px 30px -10px rgba(243, 42, 164, 0.8);

                      font-family:
                          "SFMono-Regular",
                          Consolas,
                          "Liberation Mono",
                          monospace;

                      font-size: 14px;
                      font-weight: 700;
                  }

                  .logo-dot {
                      position: absolute;
                      top: -2px;
                      right: -2px;

                      width: 7px;
                      height: 7px;

                      border: 2px solid var(--background);
                      border-radius: 999px;

                      background: var(--pink);

                      box-shadow: 0 0 14px rgba(243, 42, 164, 0.85);
                  }

                  .eyebrow {
                      display: inline-flex;
                      align-items: center;
                      gap: 7px;

                      margin-bottom: 20px;
                      padding: 6px 10px;

                      border: 1px solid rgba(99, 102, 241, 0.35);
                      border-radius: 999px;

                      background: rgba(99, 102, 241, 0.1);
                      color: #c4b5fd;

                      font-size: 11px;
                      font-weight: 700;
                      letter-spacing: 0.14em;
                      text-transform: uppercase;
                  }

                  .eyebrow-dot {
                      width: 6px;
                      height: 6px;

                      border-radius: 50%;

                      background: var(--success);

                      box-shadow: 0 0 12px rgba(34, 197, 94, 0.8);
                  }

                  .success-icon {
                      position: relative;

                      width: 72px;
                      height: 72px;

                      display: flex;
                      align-items: center;
                      justify-content: center;

                      margin: 0 auto 26px;

                      border: 1px solid rgba(139, 92, 246, 0.42);
                      border-radius: 22px;

                      background: linear-gradient(
                          135deg,
                          rgba(99, 102, 241, 0.22),
                          rgba(243, 42, 164, 0.16)
                      );

                      color: #ddd6fe;

                      box-shadow:
                          0 0 45px -12px rgba(99, 102, 241, 0.9),
                          inset 0 1px 0 rgba(255, 255, 255, 0.08);
                  }

                  .success-icon svg {
                      width: 34px;
                      height: 34px;

                      fill: none;
                      stroke: currentColor;
                      stroke-linecap: round;
                      stroke-linejoin: round;
                      stroke-width: 2.4;
                  }

                  h1 {
                      margin-bottom: 14px;

                      font-size: clamp(30px, 7vw, 42px);
                      font-weight: 850;
                      letter-spacing: -0.05em;
                      line-height: 1.08;
                  }

                  .gradient-text {
                      display: block;

                      background: linear-gradient(
                          135deg,
                          #818cf8,
                          #c084fc 52%,
                          #f472b6
                      );

                      background-clip: text;
                      -webkit-background-clip: text;
                      color: transparent;
                      -webkit-text-fill-color: transparent;
                  }

                  .description {
                      max-width: 430px;
                      margin: 0 auto;

                      color: var(--muted);

                      font-size: 15px;
                      line-height: 1.75;
                  }

                  .terminal {
                      width: 100%;

                      margin-top: 30px;
                      overflow: hidden;

                      border: 1px solid var(--border);
                      border-radius: 14px;

                      background: rgba(8, 8, 13, 0.9);

                      box-shadow:
                          0 18px 45px -28px rgba(99, 102, 241, 0.9),
                          inset 0 1px 0 rgba(255, 255, 255, 0.035);

                      text-align: left;
                  }

                  .terminal-header {
                      display: flex;
                      align-items: center;
                      gap: 6px;

                      padding: 10px 13px;

                      border-bottom: 1px solid var(--border);

                      background: rgba(255, 255, 255, 0.025);
                  }

                  .window-dot {
                      width: 8px;
                      height: 8px;

                      border-radius: 50%;
                  }

                  .window-dot.pink {
                      background: rgba(243, 42, 164, 0.8);
                  }

                  .window-dot.violet {
                      background: rgba(139, 92, 246, 0.8);
                  }

                  .window-dot.indigo {
                      background: rgba(99, 102, 241, 0.8);
                  }

                  .terminal-title {
                      margin-left: 6px;

                      color: #71717a;

                      font-family:
                          "SFMono-Regular",
                          Consolas,
                          "Liberation Mono",
                          monospace;

                      font-size: 10px;
                  }

                  .terminal-content {
                      display: flex;
                      align-items: center;
                      gap: 10px;

                      padding: 15px 16px;

                      color: #d4d4d8;

                      font-family:
                          "SFMono-Regular",
                          Consolas,
                          "Liberation Mono",
                          monospace;

                      font-size: 13px;
                  }

                  .terminal-prompt {
                      color: var(--pink);
                  }

                  .terminal-status {
                      display: inline-flex;
                      align-items: center;
                      gap: 7px;

                      color: #e4e4e7;
                  }

                  .terminal-status-dot {
                      width: 7px;
                      height: 7px;

                      flex: 0 0 auto;

                      border-radius: 50%;

                      background: var(--success);

                      box-shadow: 0 0 12px rgba(34, 197, 94, 0.75);
                  }

                  .footer {
                      margin-top: 32px;

                      color: #52525b;

                      font-size: 12px;
                      letter-spacing: 0.03em;
                  }

                  @media (max-width: 520px) {
                      body {
                          padding: 16px;
                      }

                      .container {
                          padding: 38px 22px 30px;
                          border-radius: 22px;
                      }

                      .description {
                          font-size: 14px;
                      }
                  }

                  @media (prefers-reduced-motion: no-preference) {
                      .success-icon {
                          animation: reveal 500ms ease-out both;
                      }

                      .terminal-status-dot {
                          animation: pulse 2.2s ease-in-out infinite;
                      }

                      @keyframes reveal {
                          from {
                              opacity: 0;
                              transform: translateY(8px) scale(0.92);
                          }

                          to {
                              opacity: 1;
                              transform: translateY(0) scale(1);
                          }
                      }

                      @keyframes pulse {
                          0%,
                          100% {
                              opacity: 0.65;
                              transform: scale(0.9);
                          }

                          50% {
                              opacity: 1;
                              transform: scale(1);
                          }
                      }
                  }
              </style>
          </head>

          <body>
              <main class="container">
                 

                  <div class="eyebrow">
                      <span class="eyebrow-dot"></span>
                      Secure connection established
                  </div>

                  <div class="success-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                          <path d="M20 6 9 17l-5-5"></path>
                      </svg>
                  </div>

                  <h1>
                      Authentication
                      <span class="gradient-text">successful</span>
                  </h1>

                  <p class="description">
                      Your Envly CLI is now securely connected to your account.
                      You can close this window and return to your terminal.
                  </p>

                  <div class="terminal" aria-label="CLI authentication status">
                      <div class="terminal-header" aria-hidden="true">
                          <span class="window-dot pink"></span>
                          <span class="window-dot violet"></span>
                          <span class="window-dot indigo"></span>
                          <span class="terminal-title">envly — terminal</span>
                      </div>

                      <div class="terminal-content">
                          <span class="terminal-prompt">$</span>

                          <span class="terminal-status">
                              <span class="terminal-status-dot"></span>
                              Logged in successfully.
                          </span>
                      </div>
                  </div>

                  <footer class="footer">
                      envly.dev · Secure environment management
                  </footer>
              </main>
          </body>
      </html>
`