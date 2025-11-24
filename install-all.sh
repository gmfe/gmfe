#!/bin/bash

set -euo pipefail  # 启用严格模式，遇到错误立即退出

# 定义日志函数：显示具体目录名
log() {
    local dir_name="${1:-$(basename "$PWD")}"
    local green="$(tput setaf 2)"
    local reset="$(tput sgr0)"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ${green}✅ $dir_name 依赖安装完成${reset}"
}

echo "[$(date '+%Y-%m-%d %H:%M:%S')] $(tput setaf 2)✅ ===== 建议 node 版本控制在16.2.0 安装 ====="

# 检查yarn是否安装
if ! command -v yarn &> /dev/null; then
    echo "❌ 错误：未找到yarn命令。请先安装Yarn。"
    exit 1
fi

# 定义package.json路径
ROOT_PKG_JSON="package.json"

# 检查是否已存在"private"字段
if ! jq -e '.private' "$ROOT_PKG_JSON" &> /dev/null 2>&1; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ⚙️  检测到根package.json缺少'private'字段，正在添加..."
    jq '.private = true' "$ROOT_PKG_JSON" > "${ROOT_PKG_JSON}.tmp" && mv "${ROOT_PKG_JSON}.tmp" "$ROOT_PKG_JSON"
fi

# 安装主目录
echo "[$(date '+%Y-%m-%d %H:%M:%S')] 📁 开始安装主目录 $(basename "$PWD")"
yarn install
log "$(basename "$PWD")"

# 安装packages目录下的所有子目录
echo "[$(date '+%Y-%m-%d %H:%M:%S')] 📁 开始安装packages目录下的所有子项目"
for package_dir in packages/*/; do
    if [ -f "${package_dir}package.json" ]; then
        (cd "$package_dir" && yarn install)
        log "$(basename "$package_dir")"
    fi
done

# 安装完成后，移除"private": true字段
echo "[$(date '+%Y-%m-%d %H:%M:%S')] ⚙️  正在清理，移除'private'字段..."
jq 'del(.private)' "$ROOT_PKG_JSON" > "${ROOT_PKG_JSON}.tmp" && mv "${ROOT_PKG_JSON}.tmp" "$ROOT_PKG_JSON"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] 🎉 所有依赖安装完成！"
