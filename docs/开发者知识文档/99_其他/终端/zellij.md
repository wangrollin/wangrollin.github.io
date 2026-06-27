
## 配置cmd+左右键进行zellij tab切换 && ghostty 不要监听cmd+左右键

   keybinds {
        shared_except "locked" {
            bind "Super Left" { GoToPreviousTab; }
            bind "Super Right" { GoToNextTab; }
        }
    }

    ~/.config/zellij/config.kdl
