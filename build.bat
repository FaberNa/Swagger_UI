@echo off
call del .\target\Swagger_UI.tar.gz
call del .\target\bundle.js
REM call webpack --config webpack.config.js && 
CALL 7z.exe a -ttar ./target/Swagger_UI.tar .
call 7z.exe d .\target\Swagger_UI.tar webpack.config.js -r 
call 7z.exe d .\target\Swagger_UI.tar package-lock.json 
call 7z.exe d .\target\Swagger_UI.tar .idea -r
call 7z.exe d .\target\Swagger_UI.tar node_modules\webpack
call 7z.exe d .\target\Swagger_UI.tar node_modules\html-loader
call 7z.exe d .\target\Swagger_UI.tar node_modules\css-loader
call 7z.exe d .\target\Swagger_UI.tar node_modules\file-loader
call 7z.exe d .\target\Swagger_UI.tar node_modules\compression-webpack-plugin
call 7z.exe d .\target\Swagger_UI.tar .git -r
call 7z.exe d .\target\Swagger_UI.tar package.json 
call 7z.exe d .\target\Swagger_UI.tar .gitignore
call 7z.exe d .\target\Swagger_UI.tar build.bat -r
call 7z.exe d .\target\Swagger_UI.tar target -r
call 7z.exe d .\target\Swagger_UI.tar bundle.js -r
call 7z.exe a -tgzip .\target\Swagger_UI.tar.gz .\target\Swagger_UI.tar
call del .\target\Swagger_UI.tar
call echo 'ready to copy' 
call WinSCP.exe /log=.\target\WinSCP.log /ini=nul /script=.\target\template.txt
call echo 'finish'
