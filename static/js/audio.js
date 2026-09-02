document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.audio-player-block').forEach(container => {
        const audio = container.querySelector('.audio-element');
        const playPauseBtn = container.querySelector('.play-pause');
        const playIcon = container.querySelector('.play-icon');
        const pauseIcon = container.querySelector('.pause-icon');
        const progress = container.querySelector('.audio-progress');
        const progressFill = container.querySelector('.audio-progress-fill');
        const currentTimeEl = container.querySelector('.current-time');
        const durationEl = container.querySelector('.duration');
        const trackLabel = container.querySelector('.track-label');
        const trackRows = Array.from(container.querySelectorAll('.track-row'));

        function formatTime(seconds) {
            if (!isFinite(seconds)) return '0:00';
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        }

        function showPlaying(isPlaying) {
            playIcon.classList.toggle('hidden', isPlaying);
            pauseIcon.classList.toggle('hidden', !isPlaying);
            trackRows.forEach(row => {
                const isActiveRow = row.classList.contains('is-active');
                row.querySelector('.track-row-icon').classList.toggle('hidden', !(isActiveRow && isPlaying));
                row.querySelector('.track-row-index').classList.toggle('hidden', isActiveRow && isPlaying);
            });
        }

        function setActiveRow(row) {
            trackRows.forEach(r => {
                r.classList.toggle('is-active', r === row);
                r.querySelector('span.flex-1').classList.toggle('text-white', r === row);
            });
        }

        function loadTrack(src, label) {
            audio.src = src;
            if (trackLabel) trackLabel.textContent = label;
        }

        audio.addEventListener('loadedmetadata', () => {
            durationEl.textContent = formatTime(audio.duration);
        });

        audio.addEventListener('timeupdate', () => {
            const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
            progressFill.style.width = `${pct}%`;
            currentTimeEl.textContent = formatTime(audio.currentTime);
        });

        audio.addEventListener('play', () => {
            document.querySelectorAll('.audio-player-block .audio-element').forEach(other => {
                if (other !== audio) other.pause();
            });
            showPlaying(true);
        });
        audio.addEventListener('pause', () => showPlaying(false));
        audio.addEventListener('ended', () => {
            showPlaying(false);
            if (trackRows.length > 1) {
                const activeIndex = trackRows.findIndex(r => r.classList.contains('is-active'));
                const next = trackRows[activeIndex + 1];
                if (next) {
                    next.click();
                    audio.play();
                }
            }
        });

        playPauseBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        });

        progress.addEventListener('click', e => {
            const rect = progress.getBoundingClientRect();
            const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
            if (audio.duration) audio.currentTime = ratio * audio.duration;
        });

        trackRows.forEach(row => {
            row.addEventListener('click', () => {
                setActiveRow(row);
                loadTrack(row.dataset.src, row.dataset.label);
                audio.play();
            });
        });
    });
});
