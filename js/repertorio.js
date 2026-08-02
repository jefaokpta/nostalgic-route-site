(function () {
  const container = document.getElementById('repertorio-container');
  const searchInput = document.getElementById('repertorio-search');
  if (!container) return;

  let allSongs = [];

  function renderSongs(songs) {
    if (songs.length === 0) {
      container.innerHTML = '<p class="repertorio-empty">Nenhuma música encontrada.</p>';
      return;
    }

    const rows = songs
        .map((song) => {
          const spotifyLink = song.spotify
              ? `<a class="spotify-link" href="${song.spotify}" target="_blank" rel="noopener noreferrer" aria-label="Ouvir ${song.title} no Spotify" title="Ouvir no Spotify">
               <svg class="spotify-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                 <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.539-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.302 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C9.179 8.7 4.079 9.0 1.62 9.78.72 10.08.181 9.42.061 9c-.36-1.02.42-1.32.96-1.38 3.06-.6 7.68-1.86 13.739 1.02.6.3.96 1.02.66 1.62-.24.6-1.02.84-1.62.6z"/>
               </svg>
             </a>`
              : '<span class="spotify-empty">—</span>';

          return `<tr>
            <td>${song.title}</td>
            <td class="col-artist">${song.artist}</td>
            <td class="col-year">${song.year}</td>
            <td class="col-spotify">${spotifyLink}</td>
          </tr>`;
        })
      .join('');

    container.innerHTML = `
      <table class="repertorio-table">
        <thead>
          <tr>
            <th>Música</th>
            <th class="col-artist">Banda</th>
            <th class="col-year">Ano</th>
            <th class="col-spotify">Ouvir</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }

  function filterSongs(query) {
    const term = query.trim().toLowerCase();
    if (!term) {
      renderSongs(allSongs);
      return;
    }
    const filtered = allSongs.filter(
      (song) =>
        song.title.toLowerCase().includes(term) ||
        song.artist.toLowerCase().includes(term)
    );
    renderSongs(filtered);
  }

  fetch('data/repertorio.json')
    .then((res) => {
      if (!res.ok) throw new Error('Failed to load');
      return res.json();
    })
    .then((data) => {
      allSongs = data.songs || [];
      renderSongs(allSongs);
    })
    .catch(() => {
      container.innerHTML = '<p class="repertorio-empty">Erro ao carregar o repertório.</p>';
    });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => filterSongs(e.target.value));
  }
})();
