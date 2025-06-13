document.addEventListener('DOMContentLoaded', async () => {
    // Referências
    const userNameDisplayHeader = document.getElementById('userNameDisplayProdutorHeader');
    const userNameDisplayDropdown = document.getElementById('userNameDisplayProdutorDropdown');
    const userEmailDisplayDropdown = document.getElementById('userEmailDisplayProdutorDropdown');
    const userTypeDisplayDropdown = document.getElementById('userTypeDisplayProdutorDropdown');
    const logoutButton = document.getElementById('logoutButtonProdutor');
    const accountHubToggle = document.getElementById('accountHubToggle');
    const accountHubDropdown = document.getElementById('accountHubDropdown');

    // Abas
    const dashboardTab = document.getElementById('dashboardTab');
    const enviarLixoTab = document.getElementById('enviarLixoTab');
    const statusTab = document.getElementById('statusTab');

    // Seções
    const dashboardSection = document.getElementById('dashboardSection');
    const enviarLixoSection = document.getElementById('enviarLixoSection');
    const statusSection = document.getElementById('statusSection');

    // Enviar Lixo
    const addLixoForm = document.getElementById('addLixoForm');
    const nomeLixoInput = document.getElementById('nomeLixo');
    const tipoLixoSelect = document.getElementById('tipoLixo');
    const pontoColetaSelect = document.getElementById('pontoColeta');
    const enviarLixoMessage = document.getElementById('enviarLixoMessage');

    // Status
    const myLixosList = document.getElementById('myLixosList');
    const statusMessage = document.getElementById('statusMessage');
    const statusTipoLixoFilter = document.getElementById('statusTipoLixoFilter');
    const statusPontoColetaNameFilter = document.getElementById('statusPontoColetaNameFilter');

    // Dashboard
    const lixoSemanaCount = document.getElementById('lixoSemanaCount');
    const lixoMesCount = document.getElementById('lixoMesCount');
    const lixoTotalCount = document.getElementById('lixoTotalCount');
    const collectedLixosDashboardList = document.getElementById('collectedLixosDashboardList');
    const dashboardMessage = document.getElementById('dashboardMessage');

    // Comentários
    const commentsModal = document.getElementById('commentsModal');
    const closeCommentsModal = document.getElementById('closeCommentsModal');
    const lixoNameForComments = document.getElementById('lixoNameForComments');
    const commentsList = document.getElementById('commentsList');
    const addCommentForm = document.getElementById('addCommentForm');
    const newCommentText = document.getElementById('newCommentText');
    const commentMessage = document.getElementById('commentMessage');

    let currentLixoIdForComments = null;

    let simulatedLixos = JSON.parse(localStorage.getItem('simulatedLixos')) || [];
    let simulatedPontos = [
        { id: 101, nome_ponto: 'Ecoponto Praia da Costa', tipo_ponto: 'Plástico, Papel', endereco: 'Av. Antônio Gil Veloso, s/n - Praia da Costa, Vila Velha - ES' },
        { id: 102, nome_ponto: 'Ponto Comunitário Cobilândia', tipo_ponto: 'Orgânico', endereco: 'Rua Santa Terezinha, 50 - Cobilândia, Vila Velha - ES' },
        { id: 103, nome_ponto: 'Coleta Eletrônicos Glória', tipo_ponto: 'Eletrônico, Borracha', endereco: 'Rua da Indústria, 300 - Glória, Vila Velha - ES' },
        { id: 104, nome_ponto: 'Ecoponto Coqueiral', tipo_ponto: 'Vidro, Metal', endereco: 'Av. Santa Leopoldina, 800 - Coqueiral de Itaparica, Vila Velha - ES' },
        { id: 105, nome_ponto: 'Coleta Baterias Centro', tipo_ponto: 'Bateria', endereco: 'Av. Jerônimo Monteiro, 900 - Centro, Vila Velha - ES' }
    ];
    let simulatedUsers = [
        { id: 1, email: 'produtor@exemplo.com', nome: 'Produtor Teste', tipo: 'Produtor' },
        { id: 2, email: 'reciclador@exemplo.com', nome: 'Reciclador Teste', tipo: 'Reciclador' }
    ];

    // Inicializa alguns lixos se estiver vazio para simulação, (por algum motivo nao ta funcionando no local mas no banco de dados ele funcionava)
    if (simulatedLixos.length === 0) {
        simulatedLixos = [
            { id_lixo: 1, nome_lixo: 'Garrafas PET', tipo_lixo: 'Plástico', status: 'Pendente', data_postagem: new Date('2025-06-01T10:00:00Z').toISOString(), data_coleta: null, id_produtor_fk: 1, id_reciclador_fk: null, id_ponto_coleta_fk: 101, comentarios: [] },
            { id_lixo: 2, nome_lixo: 'Resto de Fruta', tipo_lixo: 'Orgânico', status: 'Reciclador à caminho', data_postagem: new Date('2025-06-03T11:30:00Z').toISOString(), data_coleta: null, id_produtor_fk: 1, id_reciclador_fk: 2, id_ponto_coleta_fk: 102, comentarios: [{ id_comentario: 1, id_lixo_fk: 2, id_usuario_fk: 1, texto: "Preciso que seja coletado logo!", data_comentario: new Date('2025-06-03T11:40:00Z').toISOString() }] },
            { id_lixo: 3, nome_lixo: 'Jornal Velho', tipo_lixo: 'Papel', status: 'Pendente', data_postagem: new Date('2025-06-05T09:00:00Z').toISOString(), data_coleta: null, id_produtor_fk: 1, id_reciclador_fk: null, id_ponto_coleta_fk: 101, comentarios: [] },
            { id_lixo: 4, nome_lixo: 'Garrafa de Vinho', tipo_lixo: 'Vidro', status: 'Pendente', data_postagem: new Date('2025-06-07T14:00:00Z').toISOString(), data_coleta: null, id_produtor_fk: 1, id_reciclador_fk: null, id_ponto_coleta_fk: 104, comentarios: [] },
            { id_lixo: 5, nome_lixo: 'Pilhas Usadas', tipo_lixo: 'Bateria', status: 'Coletado', data_postagem: new Date('2025-05-20T16:00:00Z').toISOString(), data_coleta: new Date('2025-05-21T09:00:00Z').toISOString(), id_produtor_fk: 1, id_reciclador_fk: 2, id_ponto_coleta_fk: 105, comentarios: [] },
            { id_lixo: 6, nome_lixo: 'Caixa de Leite', tipo_lixo: 'Papel', status: 'Pendente', data_postagem: new Date('2025-06-08T10:00:00Z').toISOString(), data_coleta: null, id_produtor_fk: 1, id_reciclador_fk: null, id_ponto_coleta_fk: 101, comentarios: [] },
            { id_lixo: 7, nome_lixo: 'Resto de Almoço', tipo_lixo: 'Orgânico', status: 'Coletado', data_postagem: new Date('2025-05-28T13:00:00Z').toISOString(), data_coleta: new Date('2025-05-29T08:00:00Z').toISOString(), id_produtor_fk: 1, id_reciclador_fk: 2, id_ponto_coleta_fk: 102, comentarios: [] },
            { id_lixo: 8, nome_lixo: 'Fio de Cobre', tipo_lixo: 'Metal', status: 'Pendente', data_postagem: new Date('2025-06-10T10:00:00Z').toISOString(), data_coleta: null, id_produtor_fk: 1, id_reciclador_fk: null, id_ponto_coleta_fk: 104, comentarios: [] },
            { id_lixo: 9, nome_lixo: 'Bateria de Carro', tipo_lixo: 'Bateria', status: 'Pendente', data_postagem: new Date('2025-06-11T10:00:00Z').toISOString(), data_coleta: null, id_produtor_fk: 1, id_reciclador_fk: null, id_ponto_coleta_fk: 105, comentarios: [] },
            { id_lixo: 10, nome_lixo: 'Casca de Legume', tipo_lixo: 'Orgânico', status: 'Pendente', data_postagem: new Date('2025-06-12T10:00:00Z').toISOString(), data_coleta: null, id_produtor_fk: 1, id_reciclador_fk: null, id_ponto_coleta_fk: 102, comentarios: [] },
        ];
        localStorage.setItem('simulatedLixos', JSON.stringify(simulatedLixos));
    }


    // Recupera dados do usuário do localStorage
    const userId = Number(localStorage.getItem('id_usuario'));
    const userName = localStorage.getItem('userName');
    const userType = localStorage.getItem('userType');
    const userEmail = localStorage.getItem('userEmail');

    if (!userId || userType !== 'Produtor') {
        window.location.href = 'login.html';
        return;
    }
    userNameDisplayHeader.textContent = userName;
    userNameDisplayDropdown.textContent = `Olá, ${userName}!`;
    userEmailDisplayDropdown.textContent = userEmail;
    userTypeDisplayDropdown.textContent = userType;

    // --- Conta Hub---
    accountHubToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        accountHubDropdown.classList.toggle('hidden');
    });
    document.addEventListener('click', (event) => {
        if (!accountHubToggle.contains(event.target) && !accountHubDropdown.contains(event.target)) {
            accountHubDropdown.classList.add('hidden');
        }
    });

    // --- Abas ---
    function showTab(tabId) {
        document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(section => section.classList.add('hidden'));

        const clickedTabButton = document.getElementById(tabId + 'Tab');
        clickedTabButton.classList.add('active');

        document.querySelectorAll('.tab-button').forEach(button => {
            const img = button.querySelector('img');
            if (button.classList.contains('active')) {
                img.style.filter = 'brightness(0) saturate(100%) invert(75%) sepia(88%) saturate(1987%) hue-rotate(352deg) brightness(101%) contrast(105%)'; // Laranja
            } else {
                img.style.filter = 'brightness(0) invert(1)';
            }
        });

        document.getElementById(tabId + 'Section').classList.remove('hidden');

        if (tabId === 'status') {
            loadMyLixos();
        } else if (tabId === 'dashboard') {
            loadDashboardStats();
        } else if (tabId === 'enviarLixo') {
            pontoColetaSelect.innerHTML = '<option value="">Selecione o Tipo de Lixo primeiro</option>';
        }
    }
    showTab('dashboard');
    dashboardTab.addEventListener('click', (e) => {
        e.preventDefault();
        showTab('dashboard');
    });
    enviarLixoTab.addEventListener('click', (e) => {
        e.preventDefault();
        showTab('enviarLixo');
    });
    statusTab.addEventListener('click', (e) => {
        e.preventDefault();
        showTab('status');
    });


    // --- Carregar Pontos de Colet(Enviar Lixo) ---
    async function loadPontoColeta(selectedTipoLixo) {
        pontoColetaSelect.innerHTML = '<option value="">Carregando Pontos de Coleta...</option>';
        let filteredPontos = [];
        if (selectedTipoLixo && selectedTipoLixo !== '') {
            filteredPontos = simulatedPontos.filter(ponto =>
                ponto.tipo_ponto.toLowerCase().includes(selectedTipoLixo.toLowerCase())
            );
        } else {
            filteredPontos = simulatedPontos;
        }

        pontoColetaSelect.innerHTML = '<option value="">Selecione um Ponto de Coleta</option>';
        if (filteredPontos.length === 0) {
            pontoColetaSelect.innerHTML = '<option value="">Nenhum ponto de coleta para este tipo</option>';
        } else {
            filteredPontos.forEach(ponto => {
                const option = document.createElement('option');
                option.value = ponto.id;
                option.textContent = `${ponto.nome_ponto} - ${ponto.endereco}`;
                pontoColetaSelect.appendChild(option);
            });
        }
    }
    tipoLixoSelect.addEventListener('change', () => {
        const selectedTipoLixo = tipoLixoSelect.value;
        if (selectedTipoLixo) {
            loadPontoColeta(selectedTipoLixo);
        } else {
            pontoColetaSelect.innerHTML = '<option value="">Selecione o Tipo de Lixo primeiro</option>';
        }
    });

    // --- Lógica para Adicionar Lixo (Enviar Lixo) ---
    addLixoForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        enviarLixoMessage.textContent = '';
        enviarLixoMessage.className = 'message-text';

        const nome_lixo = nomeLixoInput.value.trim();
        const tipo_lixo = tipoLixoSelect.value;
        const id_ponto_coleta_fk = Number(pontoColetaSelect.value);

        if (!nome_lixo || !tipo_lixo || !id_ponto_coleta_fk) {
            enviarLixoMessage.textContent = 'Por favor, preencha todos os campos.';
            enviarLixoMessage.classList.add('error');
            return;
        }

        const newLixo = {
            id_lixo: simulatedLixos.length > 0 ? Math.max(...simulatedLixos.map(l => l.id_lixo)) + 1 : 1,
            nome_lixo,
            tipo_lixo,
            status: 'Pendente',
            data_postagem: new Date().toISOString(),
            data_coleta: null,
            id_produtor_fk: userId,
            id_reciclador_fk: null,
            id_ponto_coleta_fk,
            comentarios: []
        };
        simulatedLixos.push(newLixo);
        localStorage.setItem('simulatedLixos', JSON.stringify(simulatedLixos));

        enviarLixoMessage.textContent = 'Lixo postado com sucesso!';
        enviarLixoMessage.classList.add('success');
        addLixoForm.reset();
        loadPontoColeta(tipoLixoSelect.value);
        loadMyLixos();
        loadDashboardStats();
    });

    // Função auxiliar para obter o SVG do ícone baseado no tipo de lixo caso algum icone bugue
    function getLixoIconSvg(tipoLixo) {
        switch (tipoLixo.toLowerCase()) {
            case 'orgânico':
                return `<svg class="icon-lixo" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="M43.75 25c0 10.34-8.41 18.75-18.75 18.75S6.25 35.34 6.25 25 14.66 6.25 25 6.25s18.75 8.41 18.75 18.75zM25 10C16.716 10 10 16.716 10 25s6.716 15 15 15 15-6.716 15-15S33.284 10 25 10zM25 15.5c-3.1 0-5.625 2.525-5.625 5.625S21.9 26.75 25 26.75s5.625-2.525 5.625-5.625S28.1 15.5 25 15.5zM22.5 30h-2.5V20H25v10h-2.5zM30 30h-2.5V20h2.5V30z"/></svg>`;
            case 'plástico':
                return `<svg class="icon-lixo" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="M37.5 12.5H12.5c-2.76 0-5 2.24-5 5v20c0 2.76 2.24 5 5 5h25c2.76 0 5-2.24 5-5v-20c0-2.76-2.24-5-5-5zm-2.5 25h-20c-1.38 0-2.5-1.12-2.5-2.5V20c0-1.38 1.12-2.5 2.5-2.5h20c1.38 0 2.5 1.12 2.5 2.5v15c0 1.38-1.12 2.5-2.5 2.5z"/></svg>`;
            case 'papel':
                return `<svg class="icon-lixo" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="M12.5 5.5v39h25v-29h-10c-2.76 0-5-2.24-5-5v-5H12.5zm12.5 0v5h5V5.5h-5z"/></svg>`;
            case 'vidro':
                return `<svg class="icon-lixo" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="M37.5 10H12.5c-2.76 0-5 2.24-5 5v20c0 2.76 2.24 5 5 5h25c2.76 0 5-2.24 5-5v-20c0-2.76-2.24-5-5-5zm-2.5 30h-20V15h20v25z"/></svg>`;
            case 'metal':
                return `<svg class="icon-lixo" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="M25 5C13.97 5 5 13.97 5 25s8.97 20 20 20 20-8.97 20-20S36.03 5 25 5zm0 35c-8.28 0-15-6.72-15-15s6.72-15 15-15 15 6.72 15 15-6.72 15-15 15zM20 20v10h10V20h-10z"/></svg>`;
            case 'eletrônico':
                return `<svg class="icon-lixo" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="M25 5C13.97 5 5 13.97 5 25s8.97 20 20 20 20-8.97 20-20S36.03 5 25 5zm0 35c-8.28 0-15-6.72-15-15s6.72-15 15-15 15 6.72 15 15-6.72 15-15 15zM20 15v5h10v-5h-10zM20 25v5h10v-5h-10zM20 35v5h10v-5h-10z"/></svg>`;
            case 'bateria':
                return `<svg class="icon-lixo" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="M40 15H10c-2.76 0-5 2.24-5 5v10c0 2.76 2.24 5 5 5h30c2.76 0 5-2.24 5-5v-10c0-2.76-2.24-5-5-5zm-2.5 15h-25V20h25v10z"/></svg>`;
            case 'borracha':
                return `<svg class="icon-lixo" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="M25 5C13.97 5 5 13.97 5 25s8.97 20 20 20 20-8.97 20-20S36.03 5 25 5zm0 35c-8.28 0-15-6.72-15-15s6.72-15 15-15 15 6.72 15 15-6.72 15-15 15zM15 22.5h20v5H15z"/></svg>`;
            default:
                return `<svg class="icon-lixo" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="M25 5C13.97 5 5 13.97 5 25s8.97 20 20 20 20-8.97 20-20S36.03 5 25 5zm0 35c-8.28 0-15-6.72-15-15s6.72-15 15-15 15 6.72 15 15-6.72 15-15 15zM22.5 15h5v20h-5zM15 22.5h20v5H15z"/></svg>`;
        }
    }

    // --- Lógica para Carregar Meus Lixos(Status) ---
    async function loadMyLixos() {
        myLixosList.innerHTML = '';
        statusMessage.textContent = 'Carregando seus lixos...';
        statusMessage.classList.remove('hidden');

        const tipoLixoFilter = statusTipoLixoFilter.value;
        const pontoColetaNameFilter = statusPontoColetaNameFilter.value.trim().toLowerCase();

        let filteredLixos = simulatedLixos.filter(lixo => lixo.id_produtor_fk === userId);

        if (tipoLixoFilter) {
            filteredLixos = filteredLixos.filter(lixo => lixo.tipo_lixo.toLowerCase().includes(tipoLixoFilter.toLowerCase()));
        }
        if (pontoColetaNameFilter) {
            filteredLixos = filteredLixos.filter(lixo => {
                const ponto = simulatedPontos.find(p => p.id === lixo.id_ponto_coleta_fk);
                return ponto && ponto.nome_ponto.toLowerCase().includes(pontoColetaNameFilter);
            });
        }

        if (filteredLixos.length === 0) {
            statusMessage.textContent = 'Você ainda não postou nenhum lixo ou nenhum lixo corresponde aos filtros.';
            return;
        }

        statusMessage.classList.add('hidden');
        myLixosList.classList.remove('hidden');

        filteredLixos.forEach(lixo => {
            const pontoColeta = simulatedPontos.find(p => p.id === lixo.id_ponto_coleta_fk);
            const reciclador = simulatedUsers.find(u => u.id === lixo.id_reciclador_fk);

            const card = document.createElement('div');
            card.className = `lixo-card status-${lixo.status.replace(/\s/g, '-')}`;

            const dataPostagem = new Date(lixo.data_postagem).toLocaleString('pt-BR');
            const dataColeta = lixo.data_coleta ? new Date(lixo.data_coleta).toLocaleString('pt-BR') : 'N/A';
            const recicladorNome = reciclador ? reciclador.nome : 'Aguardando Reciclador';

            card.innerHTML = `
                        <button data-id="${lixo.id_lixo}" class="cancel-button cancel-lixo-btn" title="Cancelar Lixo">
                            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                        <h3>${lixo.nome_lixo}</h3>
                        ${getLixoIconSvg(lixo.tipo_lixo)}
                        <div class="lixo-card-details">
                            <p><strong>Tipo:</strong> ${lixo.tipo_lixo}</p>
                            <p><strong>Ponto:</strong> ${pontoColeta ? pontoColeta.nome_ponto : 'N/A'}</p>
                            <p><strong>Status:</strong> ${lixo.status}</p>
                            <p><strong>Reciclador:</strong> ${recicladorNome}</p>
                            <p class="text-muted">Postado em: ${dataPostagem}</p>
                            ${lixo.status === 'Coletado' ? `<p class="text-muted">Coletado em: ${dataColeta}</p>` : ''}
                        </div>
                        <button data-id="${lixo.id_lixo}" data-name="${lixo.nome_lixo}" class="comments-button view-comments-btn">
                            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.105A9.764 9.764 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                            <span>Comentários</span>
                        </button>
                    `;
            myLixosList.appendChild(card);

            if (lixo.status !== 'Coletado' && lixo.status !== 'Cancelado') {
                card.querySelector('.cancel-lixo-btn').addEventListener('click', async (e) => {
                    const lixoId = Number(e.currentTarget.dataset.id);
                    if (confirm('Tem certeza que deseja cancelar este lixo?')) {
                        const lixoIndex = simulatedLixos.findIndex(item => item.id_lixo === lixoId);
                        if (lixoIndex !== -1) {
                            simulatedLixos[lixoIndex].status = 'Cancelado';
                            simulatedLixos[lixoIndex].id_reciclador_fk = null;
                            simulatedLixos[lixoIndex].data_coleta = null;
                            localStorage.setItem('simulatedLixos', JSON.stringify(simulatedLixos));
                            alert('Lixo cancelado com sucesso pelo produtor.');
                            loadMyLixos();
                            loadDashboardStats();
                        }
                    }
                });
            } else {
                const cancelButton = card.querySelector('.cancel-lixo-btn');
                if (cancelButton) cancelButton.remove();
            }

            card.querySelector('.view-comments-btn').addEventListener('click', (e) => {
                const lixoId = Number(e.currentTarget.dataset.id);
                const lixoName = e.currentTarget.dataset.name;
                openCommentsModal(lixoId, lixoName);
            });
        });
    }

    statusTipoLixoFilter.addEventListener('change', loadMyLixos);
    statusPontoColetaNameFilter.addEventListener('input', loadMyLixos);

    // Gráficos
    let lixoSemanaChartInstance = null;
    let lixoMesChartInstance = null;

    function renderCharts(myLixos) {
        // Gráfico Semanal
        const lixosPorDiaSemana = Array(7).fill(0);
        const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

        myLixos.forEach(lixo => {
            const date = new Date(lixo.data_postagem);
            lixosPorDiaSemana[date.getDay()]++;
        });

        const ctxSemana = document.getElementById('lixoSemanaChart').getContext('2d');
        if (lixoSemanaChartInstance) {
            lixoSemanaChartInstance.destroy();
        }
        lixoSemanaChartInstance = new Chart(ctxSemana, {
            type: 'bar',
            data: {
                labels: daysOfWeek,
                datasets: [{
                    label: 'Lixos Postados',
                    data: lixosPorDiaSemana,
                    backgroundColor: '#038C7F',
                    borderColor: '#02665e',
                    borderWidth: 1,
                    borderRadius: 5,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            title: (context) => context[0].label,
                            label: (context) => `${context.dataset.label}: ${context.raw}`
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                            color: '#4a5568'
                        },
                        grid: {
                            color: '#e2e8f0'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#4a5568'
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });

        // Gráfico Mensal
        const lixosPorMes = Array(12).fill(0);
        const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

        myLixos.forEach(lixo => {
            const date = new Date(lixo.data_postagem);
            lixosPorMes[date.getMonth()]++;
        });

        const ctxMes = document.getElementById('lixoMesChart').getContext('2d');
        if (lixoMesChartInstance) {
            lixoMesChartInstance.destroy();
        }
        lixoMesChartInstance = new Chart(ctxMes, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Lixos Postados',
                    data: lixosPorMes,
                    backgroundColor: 'rgba(242, 143, 0, 0.4)',
                    borderColor: '#F28F00',
                    borderWidth: 2,
                    tension: 0.3,
                    pointBackgroundColor: '#F28F00',
                    pointBorderColor: '#F28F00',
                    pointRadius: 4,
                    fill: true,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            title: (context) => months[context[0].dataIndex],
                            label: (context) => `${context.dataset.label}: ${context.raw}`
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                            color: '#4a5568'
                        },
                        grid: {
                            color: '#e2e8f0'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#4a5568'
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // --- Carregar Estatísticas e Lixos Coletados do Dashboard ---
    async function loadDashboardStats() {
        dashboardMessage.textContent = 'Carregando estatísticas...';
        dashboardMessage.classList.remove('hidden');

        const myLixos = simulatedLixos.filter(lixo => lixo.id_produtor_fk === userId);

        const totalLixo = myLixos.length;

        const now = new Date();
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const lixoSemana = myLixos.filter(lixo => new Date(lixo.data_postagem) >= startOfWeek).length;
        const lixoMes = myLixos.filter(lixo => new Date(lixo.data_postagem) >= startOfMonth).length;

        const lixoColetado = myLixos.filter(lixo => lixo.status === 'Coletado')
            .sort((a, b) => new Date(b.data_coleta) - new Date(a.data_coleta));

        lixoSemanaCount.textContent = lixoSemana;
        lixoMesCount.textContent = lixoMes;
        lixoTotalCount.textContent = totalLixo;

        renderCharts(myLixos); // Chart.js

        // Carrega os cards de lixo coletado no dashboard
        collectedLixosDashboardList.innerHTML = '';
        if (lixoColetado.length === 0) {
            dashboardMessage.textContent = 'Nenhum lixo coletado recentemente para exibir.';
            dashboardMessage.classList.remove('hidden');
            collectedLixosDashboardList.classList.add('hidden');
        } else {
            dashboardMessage.classList.add('hidden');
            collectedLixosDashboardList.classList.remove('hidden');
            lixoColetado.forEach(lixo => {
                const pontoColeta = simulatedPontos.find(p => p.id === lixo.id_ponto_coleta_fk);
                const reciclador = simulatedUsers.find(u => u.id === lixo.id_reciclador_fk);

                const card = document.createElement('div');
                card.className = `lixo-card status-Coletado`;

                const dataPostagem = new Date(lixo.data_postagem).toLocaleString('pt-BR');
                const dataColeta = lixo.data_coleta ? new Date(lixo.data_coleta).toLocaleString('pt-BR') : 'N/A';
                const recicladorNome = reciclador ? reciclador.nome : 'N/A';

                card.innerHTML = `
                            <h3>${lixo.nome_lixo}</h3>
                            ${getLixoIconSvg(lixo.tipo_lixo)}
                            <div class="lixo-card-details">
                                <p><strong>Tipo:</strong> ${lixo.tipo_lixo}</p>
                                <p><strong>Ponto:</strong> ${pontoColeta ? pontoColeta.nome_ponto : 'N/A'}</p>
                                <p><strong>Status:</strong> Coletado</p>
                                <p><strong>Reciclador:</strong> ${recicladorNome}</p>
                                <p class="text-muted">Postado em: ${dataPostagem}</p>
                                <p class="text-muted">Coletado em: ${dataColeta}</p>
                            </div>
                            <button data-id="${lixo.id_lixo}" data-name="${lixo.nome_lixo}" class="comments-button view-comments-btn">
                                <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.105A9.764 9.764 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                <span>Comentários</span>
                            </button>
                        `;
                collectedLixosDashboardList.appendChild(card);

                card.querySelector('.view-comments-btn').addEventListener('click', (e) => {
                    const lixoId = Number(e.currentTarget.dataset.id);
                    const lixoName = e.currentTarget.dataset.name;
                    openCommentsModal(lixoId, lixoName);
                });
            });
        }
    }

    // --- Comentários ---
    async function openCommentsModal(lixoId, lixoName) {
        currentLixoIdForComments = lixoId;
        lixoNameForComments.textContent = lixoName;
        commentsList.innerHTML = '<p class="comment-text">Carregando comentários...</p>';
        commentMessage.textContent = '';
        newCommentText.value = '';
        commentsModal.classList.remove('hidden');

        await loadComments(lixoId);
    }

    closeCommentsModal.addEventListener('click', () => {
        commentsModal.classList.add('hidden');
        currentLixoIdForComments = null;
    });

    async function loadComments(lixoId) {
        const lixo = simulatedLixos.find(l => l.id_lixo === lixoId);
        commentsList.innerHTML = '';

        if (lixo && lixo.comentarios.length > 0) {
            lixo.comentarios.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment-item';
                const commentDate = new Date(comment.data_comentario).toLocaleString('pt-BR');
                const userComment = simulatedUsers.find(u => u.id === comment.id_usuario_fk);
                commentDiv.innerHTML = `
                            <p class="comment-author">${userComment ? userComment.nome : 'Usuário Desconhecido'} (${userComment ? userComment.tipo : ''}) <span class="comment-date">- ${commentDate}</span></p>
                            <p class="comment-text">${comment.texto}</p>
                        `;
                commentsList.appendChild(commentDiv);
            });
            commentsList.scrollTop = commentsList.scrollHeight;
        } else {
            commentsList.innerHTML = '<p class="comment-text">Nenhum comentário ainda. Seja o primeiro!</p>';
        }
    }

    addCommentForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        commentMessage.textContent = '';
        commentMessage.className = 'message-text';

        const texto = newCommentText.value.trim();
        if (!texto) {
            commentMessage.textContent = 'O comentário não pode estar vazio.';
            commentMessage.classList.add('error');
            return;
        }

        const lixoIndex = simulatedLixos.findIndex(l => l.id_lixo === currentLixoIdForComments);
        if (lixoIndex !== -1) {
            const newComment = {
                id_comentario: simulatedLixos[lixoIndex].comentarios.length > 0 ? Math.max(...simulatedLixos[lixoIndex].comentarios.map(c => c.id_comentario)) + 1 : 1,
                id_lixo_fk: currentLixoIdForComments,
                id_usuario_fk: userId,
                texto,
                data_comentario: new Date().toISOString()
            };
            simulatedLixos[lixoIndex].comentarios.push(newComment);
            localStorage.setItem('simulatedLixos', JSON.stringify(simulatedLixos));
            commentMessage.textContent = 'Comentário adicionado com sucesso!';
            commentMessage.classList.add('success');
            newCommentText.value = '';
            await loadComments(currentLixoIdForComments);
        } else {
            commentMessage.textContent = 'Erro: Lixo não encontrado para adicionar comentário.';
            commentMessage.classList.add('error');
        }
    });

    // --- Sair da conta ---
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('userType');
        localStorage.removeItem('userName');
        localStorage.removeItem('id_usuario');
        localStorage.removeItem('userEmail');
        window.location.href = 'login.html';
    });
});