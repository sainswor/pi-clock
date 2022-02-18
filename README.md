# Pi-Clock

Pi-Clock is used to turn a Raspberry Pi with an attached display into a clock.

## Setup

Things to configure on Raspberry Pi itself.

 - Configure Wi-Fi / Ethernet networking.
 - Configure the time zone.
 - Clone repository and install:
   mkdir ~/work && cd ~/work && git clone https://github.com/sainswor/pi-clock && cd pi-clock && ./install.sh

## How Is This Different?

There are only a couple differences between this and https://github.com/lzs/pi-clock

- 12-hour clock mode
- `install.sh` now uses the system timezone from `/etc/timezone`
- Added inBedBefore and inBedAfter
- Added phrase mode - theoretically configurable in JSON, you're better off to just edit the script.

My grandmother was getting confused and getting up / going to bed based on what her clock said. Unfortunately this could lead to getting up at 4AM thinking she'd overslept. The solution was to replace her clock with a monitor on a pi running this script with my fork's modifications. If it's before `inBedBefore` or after `inBedAfter`, the screen will show the date or a phrase instead of the time, so you can tell at a glance if you should be up or can go back to sleep.

Added: Phrase mode, where there's an array of 24 phrases. During times when the clock is not displayed, the index of the array corresponding to the hour is shown instead of the calendar.

## References

Google Fonts are served locally so that no dependency on the Internet is required. The fonts
are downloaded using https://google-webfonts-helper.herokuapp.com/fonts.

Information on non-interactive use of raspi-config:
https://raspberrypi.stackexchange.com/questions/28907/how-could-one-automate-the-raspbian-raspi-config-setup
