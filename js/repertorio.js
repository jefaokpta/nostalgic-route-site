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
      .map(
        (song) =>
          `<tr>
            <td>${song.title}</td>
            <td class="col-artist">${song.artist}</td>
            <td class="col-year">${song.year}</td>
          </tr>`
      )
      .join('');

    container.innerHTML = `
      <table class="repertorio-table">
        <thead>
          <tr>
            <th>Música</th>
            <th class="col-artist">Banda</th>
            <th class="col-year">Ano</th>
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
