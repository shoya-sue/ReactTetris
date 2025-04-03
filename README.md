# React Tetris Game (リアクトテトリスゲーム)

## 概要 / Overview

このプロジェクトは、Reactを使用して構築されたモダンなテトリスゲームです。Framer Motionによるアニメーション効果と、カスタマイズ可能な背景音楽機能を備えています。モバイル対応のレトロゲーム風UIを実装しており、スマートフォンでも快適にプレイできます。

This project is a modern Tetris game built with React, featuring Framer Motion animations and customizable background music functionality. It includes a retro game-style UI for mobile devices, making it comfortable to play on smartphones.

## 機能 / Features

- 🎮 クラシックなテトリスのゲームプレイ / Classic Tetris gameplay
- 🎨 7種類の異なるテトロミノ（ブロック）/ 7 different tetromino shapes
- 🎵 背景音楽の再生/停止機能 / Background music toggle
- 📈 スコアシステムとレベル進行 / Scoring system and level progression
- ⚡ レベルに応じた落下速度の増加 / Increasing drop speed with levels
- ✨ 行消去時のアニメーション効果 / Line clear animations
- 🎹 キーボードコントロール / Keyboard controls
- 📱 モバイル対応のレトロゲームUI / Retro game UI for mobile devices
- 🏆 ハイスコアの保存機能 / High score saving
- 🎯 レベルアップシステム / Level-up system
- 🚀 自動落下速度の調整 / Adjustable drop speed

## 技術スタック / Tech Stack

- React
- TypeScript
- Next.js
- Framer Motion (アニメーション / animations)
- Tailwind CSS (スタイリング / styling)
- Lucide React (アイコン / icons)

## ゲームコントロール / Game Controls

### デスクトップ / Desktop
- ⬅️ 左矢印: ブロックを左に移動 / Left Arrow: Move piece left
- ➡️ 右矢印: ブロックを右に移動 / Right Arrow: Move piece right
- ⬇️ 下矢印: ブロックを下に移動 / Down Arrow: Move piece down
- ⬆️ 上矢印: ブロックを回転 / Up Arrow: Rotate piece

### モバイル / Mobile
- 十字キー: 移動と回転 / D-Pad: Movement and rotation
- Aボタン: ブロックを回転 / A Button: Rotate piece
- Bボタン: ブロックを下に移動 / B Button: Move piece down
- スワイプ操作も対応 / Swipe gestures also supported

## ゲームルール / Game Rules

1. ブロックは自動的に落下し、プレイヤーは左右に移動または回転させることができます
   Blocks fall automatically, and players can move them left/right or rotate them

2. 1行が完全に埋まると、その行は消去され、スコアが加算されます
   When a line is completely filled, it will be cleared and points are awarded

3. スコアシステム / Scoring System:
   - 1行消去: 100点 / Single line clear: 100 points
   - レベルアップ: 500点ごと / Level up: Every 500 points
   - ハイスコアは自動保存 / High scores are automatically saved

4. レベルシステム / Level System:
   - レベルアップごとに落下速度が増加 / Drop speed increases with each level
   - 速度増加率: 5% / Speed increase rate: 5%
   - 初期落下時間: 800ms / Initial drop time: 800ms

5. ゲームオーバー条件: 新しいブロックを配置できない場合
   Game Over: When a new piece cannot be placed at the starting position

## プロジェクト構造 / Project Structure

```
src/
├── components/
│   ├── ui/
│   │   └── button.tsx
│   └── Tetris.tsx
├── styles/
│   └── globals.css
└── app/
    └── page.tsx
```

## セットアップ手順 / Setup Instructions

1. リポジトリのクローン / Clone the repository:
```bash
git clone <repository-url>
```

2. 依存関係のインストール / Install dependencies:
```bash
npm install
# or
yarn install
```

3. 開発サーバーの起動 / Start development server:
```bash
npm run dev
# or
yarn dev
```

## 必要な依存関係 / Required Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.0.0",
    "lucide-react": "^0.294.0",
    "tailwindcss": "^3.3.0"
  }
}
```

## 今後の改善点 / Future Improvements

- 🎮 タッチスクリーンサポート / Touch screen support
- 🎨 テーマカスタマイズ機能 / Theme customization
- 🔊 効果音の追加 / Sound effects
- 👥 マルチプレイヤーモード / Multiplayer mode

## ライセンス / License

MIT

---

Made with ❤️ using React and modern web technologies.
