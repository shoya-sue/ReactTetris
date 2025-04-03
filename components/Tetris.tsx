'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'
import { GameControls } from './ui/GameControls'

type TetrominoType = {
  shape: number[][]
  color: string
}

type TetrominosType = {
  [key: string]: TetrominoType
}

type CurrentPieceType = {
  x: number
  y: number
  tetromino: TetrominoType
} | null

type BoardType = (string | 0)[][]

const TETROMINOS: TetrominosType = {
  I: { shape: [[1, 1, 1, 1]], color: '#38bdf8' },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: '#60a5fa' },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: '#fb923c' },
  O: { shape: [[1, 1], [1, 1]], color: '#facc15' },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: '#34d399' },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: '#c084fc' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: '#fb7185' },
}

const BOARD_WIDTH = 10
const BOARD_HEIGHT = 20
const INITIAL_DROP_TIME = 800
const SPEED_INCREASE_FACTOR = 0.95

const createEmptyBoard = (): BoardType => Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0))

const randomTetromino = (): TetrominoType => {
  const keys = Object.keys(TETROMINOS)
  const randKey = keys[Math.floor(Math.random() * keys.length)]
  return TETROMINOS[randKey]
}

export default function Tetris() {
  const [board, setBoard] = useState<BoardType>(createEmptyBoard())
  const [currentPiece, setCurrentPiece] = useState<CurrentPieceType>(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [dropTime, setDropTime] = useState(INITIAL_DROP_TIME)
  const [level, setLevel] = useState(1)
  const [completedRows, setCompletedRows] = useState<number[]>([])
  const dropInterval = useRef<NodeJS.Timeout | null>(null)
  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('tetrisHighScore') || '0')
    }
    return 0
  })

  const checkCollision = (x: number, y: number, shape: number[][]): boolean => {
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col] !== 0) {
          const newX = x + col
          const newY = y + row
          if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT || (newY >= 0 && board[newY][newX] !== 0)) {
            return true
          }
        }
      }
    }
    return false
  }

  const isValidMove = (x: number, y: number, shape: number[][]): boolean => !checkCollision(x, y, shape)

  const moveLeft = useCallback(() => {
    if (currentPiece && isValidMove(currentPiece.x - 1, currentPiece.y, currentPiece.tetromino.shape)) {
      setCurrentPiece(prev => {
        if (!prev) return null
        return { ...prev, x: prev.x - 1 }
      })
    }
  }, [currentPiece, board])

  const moveRight = useCallback(() => {
    if (currentPiece && isValidMove(currentPiece.x + 1, currentPiece.y, currentPiece.tetromino.shape)) {
      setCurrentPiece(prev => {
        if (!prev) return null
        return { ...prev, x: prev.x + 1 }
      })
    }
  }, [currentPiece, board])

  const moveDown = useCallback(() => {
    if (!currentPiece) return
    if (isValidMove(currentPiece.x, currentPiece.y + 1, currentPiece.tetromino.shape)) {
      setCurrentPiece(prev => {
        if (!prev) return null
        return { ...prev, y: prev.y + 1 }
      })
    } else {
      placePiece()
    }
  }, [currentPiece, board])

  const rotate = useCallback(() => {
    if (!currentPiece) return
    const rotated = currentPiece.tetromino.shape[0].map((_, i) =>
      currentPiece.tetromino.shape.map(row => row[i]).reverse()
    )
    let newX = currentPiece.x
    let newY = currentPiece.y

    if (!isValidMove(newX, newY, rotated)) {
      if (isValidMove(newX - 1, newY, rotated)) {
        newX -= 1
      } else if (isValidMove(newX + 1, newY, rotated)) {
        newX += 1
      } else if (isValidMove(newX, newY - 1, rotated)) {
        newY -= 1
      } else {
        return
      }
    }

    setCurrentPiece(prev => {
      if (!prev) return null
      return {
        ...prev,
        x: newX,
        y: newY,
        tetromino: { ...prev.tetromino, shape: rotated }
      }
    })

    if (isValidMove(newX, newY + 1, rotated) && newY + 1 < BOARD_HEIGHT) {
      setCurrentPiece(prev => {
        if (!prev) return null
        return { ...prev, y: prev.y + 1 }
      })
    }
  }, [currentPiece, board])

  const placePiece = useCallback(() => {
    if (!currentPiece) return
    const newBoard = board.map(row => [...row])
    currentPiece.tetromino.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          const boardY = y + currentPiece.y
          const boardX = x + currentPiece.x
          if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
            newBoard[boardY][boardX] = currentPiece.tetromino.color
          }
        }
      })
    })
    setBoard(newBoard)
    clearLines(newBoard)
    spawnNewPiece()
  }, [currentPiece, board])

  const clearLines = useCallback((newBoard: BoardType) => {
    let linesCleared: number[] = []
    const updatedBoard = newBoard.filter((row, index) => {
      if (row.every(cell => cell !== 0)) {
        linesCleared.push(index)
        return false
      }
      return true
    })
    
    if (linesCleared.length > 0) {
      setCompletedRows(linesCleared)
      setTimeout(() => {
        while (updatedBoard.length < BOARD_HEIGHT) {
          updatedBoard.unshift(Array(BOARD_WIDTH).fill(0))
        }
        setBoard(updatedBoard)
        setCompletedRows([])
        
        const newScore = score + linesCleared.length * 100
        setScore(newScore)
        
        if (Math.floor(newScore / 500) > level - 1) {
          setLevel(prev => prev + 1)
          setDropTime(prev => prev * SPEED_INCREASE_FACTOR)
        }
      }, 500)
    }
  }, [score, level])

  const spawnNewPiece = useCallback(() => {
    const newPiece = {
      x: Math.floor(BOARD_WIDTH / 2) - 1,
      y: 0,
      tetromino: randomTetromino()
    }
    if (checkCollision(newPiece.x, newPiece.y, newPiece.tetromino.shape)) {
      setGameOver(true)
    } else {
      setCurrentPiece(newPiece)
    }
  }, [board])

  useEffect(() => {
    if (!currentPiece && !gameOver) {
      spawnNewPiece()
    }
  }, [currentPiece, gameOver, spawnNewPiece])

  useEffect(() => {
    if (!gameOver) {
      dropInterval.current = setInterval(moveDown, dropTime)
    }
    return () => {
      if (dropInterval.current) {
        clearInterval(dropInterval.current as NodeJS.Timeout)
      }
    }
  }, [moveDown, gameOver, dropTime])

  useEffect(() => {
    let touchStartX = 0
    let touchStartY = 0
    const touchThreshold = 30

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (gameOver) return
      
      const touchEndX = e.touches[0].clientX
      const touchEndY = e.touches[0].clientY
      const deltaX = touchEndX - touchStartX
      const deltaY = touchEndY - touchStartY

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > touchThreshold) {
          if (deltaX > 0) {
            moveRight()
          } else {
            moveLeft()
          }
          touchStartX = touchEndX
        }
      } else {
        if (deltaY > touchThreshold) {
          moveDown()
          touchStartY = touchEndY
        } else if (deltaY < -touchThreshold) {
          rotate()
          touchStartY = touchEndY
        }
      }
    }

    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchmove', handleTouchMove)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [moveLeft, moveRight, moveDown, rotate, gameOver])

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score)
      if (typeof window !== 'undefined') {
        localStorage.setItem('tetrisHighScore', score.toString())
      }
    }
  }, [score, highScore])

  // キーボード操作のイベントリスナー
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return
      switch (e.key) {
        case 'ArrowLeft':
          moveLeft()
          break
        case 'ArrowRight':
          moveRight()
          break
        case 'ArrowDown':
          moveDown()
          break
        case 'ArrowUp':
          rotate()
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [moveLeft, moveRight, moveDown, rotate, gameOver])

  const handleGameControlPress = useCallback((direction: 'left' | 'right' | 'down' | 'up') => {
    if (gameOver) return
    switch (direction) {
      case 'left':
        moveLeft()
        break
      case 'right':
        moveRight()
        break
      case 'down':
        moveDown()
        break
      case 'up':
        rotate()
        break
    }
  }, [moveLeft, moveRight, moveDown, rotate, gameOver])

  const handleGameButtonPress = useCallback((button: 'a' | 'b') => {
    if (gameOver) return
    switch (button) {
      case 'a':
        rotate()
        break
      case 'b':
        moveDown()
        break
    }
  }, [rotate, moveDown, gameOver])

  const resetGame = () => {
    setBoard(createEmptyBoard())
    setCurrentPiece(null)
    setScore(0)
    setGameOver(false)
    setDropTime(INITIAL_DROP_TIME)
    setLevel(1)
    setCompletedRows([])
    if (dropInterval.current) {
      clearInterval(dropInterval.current as NodeJS.Timeout)
    }
  }

  return (
    <div className="relative flex flex-col items-center">
      <div className="mb-4 flex justify-between w-full max-w-xs">
        <div>
          <h2 className="text-xl font-bold" style={{ color: '#ffffff' }}>Score: {score}</h2>
          <p className="text-sm" style={{ color: '#d1d5db' }}>High Score: {highScore}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold" style={{ color: '#ffffff' }}>Level: {level}</h2>
        </div>
      </div>

      <div className="relative p-2 rounded-lg" style={{ backgroundColor: '#1f2937' }}>
        {board.map((row, y) => (
          <div key={y} className="flex">
            {row.map((cell, x) => {
              const isCurrent = currentPiece && currentPiece.tetromino.shape
                .some((row, pieceY) =>
                  row.some((value, pieceX) =>
                    value !== 0 &&
                    pieceY + currentPiece.y === y &&
                    pieceX + currentPiece.x === x
                  )
                )

              const isCompleted = completedRows.includes(y)
              const cellColor = isCurrent && currentPiece
                ? currentPiece.tetromino.color
                : typeof cell === 'string'
                  ? cell
                  : '#111827'

              return (
                <motion.div
                  key={x}
                  className="w-6 h-6 border"
                  style={{
                    backgroundColor: cellColor,
                    borderColor: '#374151'
                  }}
                  animate={isCompleted ? {
                    scale: [1, 1.2, 0],
                    transition: { duration: 0.5 }
                  } : {}}
                />
              )
            })}
          </div>
        ))}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#ffffff' }}>Game Over!</h2>
            <Button
              onClick={resetGame}
              style={{
                backgroundColor: '#3b82f6',
                color: '#ffffff',
                fontWeight: 'bold',
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
              }}
              className="hover:bg-blue-600"
            >
              Play Again
            </Button>
          </div>
        )}
      </div>

      <GameControls
        onDirectionPress={handleGameControlPress}
        onButtonPress={handleGameButtonPress}
      />
    </div>
  )
} 