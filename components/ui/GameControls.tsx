import { motion } from 'framer-motion';

interface GameControlsProps {
  onDirectionPress: (direction: 'left' | 'right' | 'down' | 'up') => void;
  onButtonPress: (button: 'a' | 'b') => void;
}

export function GameControls({ onDirectionPress, onButtonPress }: GameControlsProps) {
  const dpadButtonStyle = {
    backgroundColor: '#1f2937',
    width: '2.5rem',
    height: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '0.375rem',
    color: '#ffffff'
  };

  const actionButtonStyle = {
    width: '3rem',
    height: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '9999px',
    color: '#ffffff',
    fontWeight: 'bold'
  };

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-between px-4 md:hidden">
      {/* D-Pad */}
      <div className="relative w-32 h-32">
        <motion.button
          whileTap={{ scale: 0.9 }}
          style={{ ...dpadButtonStyle, position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}
          onClick={() => onDirectionPress('up')}
        >
          ▲
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          style={{ ...dpadButtonStyle, position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}
          onClick={() => onDirectionPress('down')}
        >
          ▼
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          style={{ ...dpadButtonStyle, position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}
          onClick={() => onDirectionPress('left')}
        >
          ◀
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          style={{ ...dpadButtonStyle, position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
          onClick={() => onDirectionPress('right')}
        >
          ▶
        </motion.button>
        <div style={{
          position: 'absolute',
          inset: 0,
          margin: 'auto',
          width: '1.5rem',
          height: '1.5rem',
          backgroundColor: '#4b5563',
          borderRadius: '9999px'
        }} />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 items-end">
        <motion.button
          whileTap={{ scale: 0.9 }}
          style={{ ...actionButtonStyle, backgroundColor: '#ef4444' }}
          onClick={() => onButtonPress('b')}
        >
          B
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          style={{ ...actionButtonStyle, backgroundColor: '#22c55e' }}
          onClick={() => onButtonPress('a')}
        >
          A
        </motion.button>
      </div>
    </div>
  );
} 