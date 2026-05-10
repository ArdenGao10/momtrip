import React, { useMemo, useState } from "react";

export default function App() {
  const [showLinkPanel, setShowLinkPanel] = useState(false);
  const [showMiniBar, setShowMiniBar] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);
  const [isHandsFree, setIsHandsFree] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const [status, setStatus] = useState("待机");

  const subtitle = useMemo(() => {
    if (status === "聆听" || isPressing || isHandsFree) {
      return "正在听你说……";
    }
    return "按住下方按钮，和我聊聊吧～";
  }, [status, isPressing, isHandsFree]);

  const statusList = ["待机", "聆听", "说话"];

  return (
    <div
      className="min-h-screen w-full bg-gradient-to-b from-[#FFFBF5] to-[#FFF0DC] text-[#4A3520]"
      style={{ fontFamily: "PingFang SC, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
    >
      {/* 全局样式：动画与波纹 */}
      <style>{`
        @keyframes wave {
          0% { transform: scale(0.9); opacity: 0.35; }
          70% { transform: scale(1.35); opacity: 0.05; }
          100% { transform: scale(1.45); opacity: 0; }
        }
        @keyframes floatIn {
          0% { transform: translateY(8px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      <div className="mx-auto max-w-md px-4 pb-28 pt-4">
        {/* 顶部导航栏 */}
        <div className="flex items-center justify-between rounded-2xl bg-[#FFF4E6]/80 px-3 py-3 shadow-sm backdrop-blur">
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-xl shadow-sm transition active:scale-95"
            aria-label="返回"
          >
            ←
          </button>

          <div className="text-center">
            <div className="text-lg font-semibold">AI 旅行管家</div>
            <div className="text-xs text-[#8B6A4A]">小橙陪你去旅行</div>
          </div>

          <button
            className="h-9 rounded-full bg-white/90 px-3 text-sm text-[#E07B3F] shadow-sm transition hover:brightness-95 active:scale-95"
            onClick={() => setShowLinkPanel(true)}
          >
            🔗 智能解析
          </button>
        </div>

        {/* AI 形象展示区 */}
        <div className="mt-5 rounded-3xl bg-[#FFF4E6]/80 p-4 shadow-sm">
          <div className="relative flex h-[38vh] flex-col items-center justify-center">
            <div className="absolute h-52 w-52 rounded-full bg-[#FF9A56]/30 blur-xl animate-pulse" />
            <div className="absolute h-60 w-60 rounded-full bg-[#FF9A56]/20 blur-2xl animate-pulse" />

            <div className="relative z-10 flex h-44 w-44 flex-col items-center justify-center rounded-full bg-[#FF9A56] text-white shadow-lg">
              <div className="text-4xl">🧡</div>
              <div className="mt-2 text-xs">此处放置 AI 形象 Lottie 动画</div>
            </div>

            <div className="mt-5 flex gap-2">
              {statusList.map((item) => (
                <button
                  key={item}
                  className={`rounded-full border px-4 py-2 text-sm transition active:scale-95 ${
                    status === item
                      ? "border-[#E07B3F] bg-[#FFE7D2] text-[#E07B3F]"
                      : "border-[#F2C9A2] bg-white/80 text-[#8B6A4A]"
                  }`}
                  onClick={() => setStatus(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 实时字幕区 */}
        <div className="mt-4 rounded-2xl bg-[#FFF4E6]/70 px-4 py-3 text-[17px] shadow-sm">
          {subtitle}
        </div>

        {/* 推荐问题卡片 */}
        <div className="mt-4">
          <div className="text-sm text-[#8B6A4A]">热门问题推荐</div>
          <div className="mt-2 flex gap-3 overflow-x-auto pb-2">
            {[
              "🍜 推荐适合妈妈的旅游城市",
              "🎒 出门旅游要带什么",
              "📸 怎么拍照好看",
              "🏥 旅途不舒服怎么办",
            ].map((text) => (
              <button
                key={text}
                className="min-w-[180px] rounded-2xl border border-[#FF9A56] bg-[#FFF4E6] px-4 py-4 text-left text-[17px] text-[#4A3520] shadow-sm transition hover:brightness-95 active:scale-95"
              >
                {text}
              </button>
            ))}
          </div>
        </div>

        {/* 语音通话主按钮 */}
        <div className="mt-6 flex flex-col items-center">
          <div className="mb-3 text-[17px] text-[#8B6A4A]">按住说话</div>
          <div className="relative flex items-center justify-center">
            {isPressing && (
              <>
                <span className="absolute h-40 w-40 rounded-full border border-[#FF9A56]/50" style={{ animation: "wave 1.6s ease-out infinite" }} />
                <span className="absolute h-40 w-40 rounded-full border border-[#FF9A56]/40" style={{ animation: "wave 1.6s ease-out 0.4s infinite" }} />
              </>
            )}
            <button
              className="relative flex h-30 w-30 items-center justify-center rounded-full bg-gradient-to-b from-[#FFB27A] to-[#FF9A56] text-3xl text-white shadow-xl transition active:scale-95"
              onMouseDown={() => setIsPressing(true)}
              onMouseUp={() => setIsPressing(false)}
              onMouseLeave={() => setIsPressing(false)}
              onTouchStart={() => setIsPressing(true)}
              onTouchEnd={() => setIsPressing(false)}
              aria-label="按住说话"
            >
              🎤
            </button>
          </div>
        </div>

        {/* 底部辅助操作栏 */}
        <div className="mt-6 flex items-center justify-between rounded-2xl bg-white/80 px-3 py-3 shadow-sm">
          <button
            className="h-11 rounded-full bg-[#FFF4E6] px-4 text-sm text-[#E07B3F] shadow-sm transition hover:brightness-95 active:scale-95"
            onClick={() => setShowTextInput((prev) => !prev)}
          >
            ⌨️ 文字输入
          </button>

          <button
            className={`h-11 rounded-full px-4 text-sm shadow-sm transition hover:brightness-95 active:scale-95 ${
              isHandsFree ? "bg-[#FFB27A] text-white" : "bg-[#FFF4E6] text-[#E07B3F]"
            }`}
            onClick={() => setIsHandsFree((prev) => !prev)}
          >
            📞 连续对话
          </button>
        </div>

        {/* 文字输入展开区 */}
        {showTextInput && (
          <div className="mt-3 rounded-2xl bg-white/90 p-3 shadow-sm" style={{ animation: "floatIn 240ms ease" }}>
            <div className="text-sm text-[#8B6A4A]">请输入想问的问题</div>
            <div className="mt-2 flex items-center gap-2">
              <input
                className="h-11 flex-1 rounded-full border border-[#F2C9A2] bg-white px-4 text-[17px] outline-none"
                placeholder="比如：适合妈妈的轻松路线"
              />
              <button className="h-11 rounded-full bg-[#FF9A56] px-4 text-sm text-white shadow-sm transition active:scale-95">
                发送
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 右下角全局悬浮球 */}
      <div className="fixed bottom-6 right-5 z-40">
        <button
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FF9A56]/80 text-2xl text-white shadow-lg transition hover:brightness-95 active:scale-95"
          onClick={() => setShowMiniBar((prev) => !prev)}
          aria-label="AI 悬浮球"
        >
          🤖
        </button>

        {showMiniBar && (
          <div
            className="mt-3 w-56 rounded-2xl bg-white/95 p-3 text-sm text-[#4A3520] shadow-lg"
            style={{ animation: "floatIn 240ms ease" }}
          >
            需要我帮你安排下一站吗？
          </div>
        )}
      </div>

      {/* 智能解析弹层 */}
      {showLinkPanel && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 px-4 pb-10">
          <div className="w-full max-w-md rounded-3xl bg-white p-5 shadow-xl">
            <div className="text-lg font-semibold text-[#4A3520]">粘贴小红书链接</div>
            <div className="mt-1 text-sm text-[#8B6A4A]">我会帮你解析行程要点</div>
            <input
              className="mt-4 h-12 w-full rounded-2xl border border-[#F2C9A2] bg-[#FFF4E6]/40 px-4 text-[17px] outline-none"
              placeholder="https://www.xiaohongshu.com/"
            />
            <div className="mt-4 flex gap-3">
              <button
                className="h-11 flex-1 rounded-full bg-[#FFF4E6] text-sm text-[#8B6A4A]"
                onClick={() => setShowLinkPanel(false)}
              >
                取消
              </button>
              <button className="h-11 flex-1 rounded-full bg-[#FF9A56] text-sm text-white shadow-sm">
                解析
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
