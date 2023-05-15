
# Network Time Protocol (NTP)

- ntpdc
- ntpdate
- ntpd

## 同步一次

sudo apt install ntpdate
sudo timedatectl set-ntp off
ntpdate pool.ntp.org


## 一直同步

ntpd: ntp daemon
/etc/ntp.conf

sudo apt install ntp
sudo systemctl restart ntp
ntpq -p

