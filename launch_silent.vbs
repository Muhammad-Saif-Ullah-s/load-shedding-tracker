' Pakistan Load Shedding Tracker - Silent Launcher
' This VBS launches the app server silently and opens the browser

Dim objShell, objFSO, appDir, serverCmd, port

Set objShell = CreateObject("WScript.Shell")
Set objFSO   = CreateObject("Scripting.FileSystemObject")

' Get the directory of this script
appDir = objFSO.GetParentFolderName(WScript.ScriptFullName)
port   = 4173

' Kill any previous instance on that port (silent, ignore errors)
On Error Resume Next
objShell.Run "cmd /c for /f ""tokens=5"" %a in ('netstat -aon ^| findstr :" & port & "') do taskkill /f /pid %a", 0, True
On Error GoTo 0

' Start the vite preview server (hidden window)
serverCmd = "cmd /c cd /d """ & appDir & """ && npx vite preview --port " & port
objShell.Run serverCmd, 0, False

' Wait 2 seconds for server to start
WScript.Sleep 2000

' Open the browser
objShell.Run "http://localhost:" & port, 1, False

' Show a tray-style message
objShell.Popup "Pakistan Load Shedding Tracker is running!" & vbCrLf & _
               "URL: http://localhost:" & port & vbCrLf & vbCrLf & _
               "Close this dialog when done to stop the server.", _
               0, "Load Shedding Tracker - پاکستان لوڈ شیڈنگ ٹریکر", 64

' Kill the server when popup is dismissed
objShell.Run "cmd /c for /f ""tokens=5"" %a in ('netstat -aon ^| findstr :" & port & "') do taskkill /f /pid %a", 0, True

Set objShell = Nothing
Set objFSO   = Nothing
