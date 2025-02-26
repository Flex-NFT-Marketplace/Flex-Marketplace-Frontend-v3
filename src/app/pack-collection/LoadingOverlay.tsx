import React from "react";

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  // Không hiển thị nếu không ở trạng thái loading
  if (!isLoading) return null;

  // Tổng số thanh tạo nên vòng tròn
  const barCount = 12;
  // Góc xoay giữa các thanh
  const rotateAngle = 360 / barCount;

  return (
    <>
      <div className="loading-overlay">
        <div className="spinner">
          {/* Tạo mảng barCount phần tử, mỗi phần tử là 1 "thanh" */}
          {[...Array(barCount)].map((_, i) => (
            <div
              key={i}
              className="bar"
              style={{
                // Xoay từng thanh x độ rồi đẩy ra xa tâm
                transform: `rotate(${rotateAngle * i}deg) translate(0, -18px)`,
                // Thời gian trễ animation để tạo hiệu ứng xoay/fade liên tục
                animationDelay: `-${(barCount - i) / 10}s`,
              }}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .spinner {
          position: relative;
          width: 50px;
          height: 50px;
        }
        .bar {
          position: absolute;
          top: 50%;
          left: 50%;
          /* Kích thước mỗi thanh */
          width: 4px;
          height: 12px;
          background: #fff;
          border-radius: 2px;
          transform-origin: center center;
          /* Animation fade cho mỗi thanh */
          animation: barFade 1.2s linear infinite;
        }
        @keyframes barFade {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0.2;
          }
        }
      `}</style>
    </>
  );
};

export default LoadingOverlay;
