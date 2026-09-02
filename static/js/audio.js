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
        const trackSelect = container.querySelector('.track-select');

        function formatTime(seconds) {
            if (!isFinite(seconds)) return '0:00';
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        }

        function showPlaying(isPlaying) {
            playIcon.classList.toggle('hidden', isPlaying);
            pauseIcon.classList.toggle('hidden', !isPlaying);
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
        audio.addEventListener('ended', () => showPlaying(false));

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

        if (trackSelect) {
            trackSelect.addEventListener('change', e => {
                const option = e.target.selectedOptions[0];
                audio.src = option.value;
                if (trackLabel) trackLabel.textContent = option.dataset.label;
                audio.play();
            });
        }
    });
});
