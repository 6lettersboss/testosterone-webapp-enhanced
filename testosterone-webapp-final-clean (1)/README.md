# GitHub & Vercel 연동 방법

1. GitHub에 새 repository를 생성하세요. 예: `testosterone-webapp-final`
2. 아래 명령어를 복사해서 터미널에 붙여넣으세요:

```bash
cd ~/Downloads/testosterone-webapp-final-clean
git remote add origin https://github.com/6lettersboss/testosterone-webapp-final.git
git branch -M main
git push -u origin main
```

3. Vercel에서 `Import Git Repository`로 해당 GitHub repo를 선택하세요.
4. 프레임워크는 `Next.js`, root directory는 `./`, 자동 인식되도록 설정하세요.