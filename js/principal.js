// Variables globales para el chat
        let chatHistory = [];
        
        // Respuestas automáticas del bot
        const botResponses = {
            becas: "Te puedo ayudar con información sobre becas. ¿Qué específicamente quieres saber? Puedo ayudarte con: requisitos, fechas de postulación, tipos de becas disponibles, o el proceso de aplicación.",
            certificados: "Sobre certificados académicos, puedo informarte sobre: cómo solicitar certificados de estudios, tiempos de entrega, costos, certificados digitales, o validación de documentos.",
            notas: "Para consultas sobre notas académicas: consulta de calificaciones, récord académico, corrección de notas, fechas de publicación de resultados, o cálculo de promedio ponderado.",
            matricula: "Información sobre matrícula: proceso de matrícula, fechas importantes, documentos requeridos, costos de matrícula, cambio de cursos, o matrícula extemporánea.",
            servicios: "Los servicios universitarios incluyen: biblioteca, laboratorios, servicios médicos, psicológicos, deportivos, bolsa de trabajo, y servicios de bienestar estudiantil.",
            influencia: "Influencia UTP es nuestro programa de liderazgo estudiantil que incluye: actividades extracurriculares, proyectos sociales, desarrollo de habilidades blandas, y networking.",
            saludo: "¡Hola! Soy tu asistente virtual de SAE. Estoy aquí para ayudarte con consultas sobre becas, certificados, notas, matrícula, servicios universitarios e Influencia UTP. ¿En qué puedo ayudarte?",
            default: "Entiendo tu consulta. Para brindarte la mejor ayuda, puedes preguntarme sobre: becas, certificados, notas, matrícula, servicios universitarios o Influencia UTP. ¿Hay algo específico en lo que pueda ayudarte?"
        };

        // Función para mostrar secciones del sidebar
        function showSection(section) {
            // Remover clase active de todos los items
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Agregar clase active al item seleccionado
            event.target.classList.add('active');
            
            // Mostrar contenido según la sección
            if (section === 'consultas') {
                openChat();
            } else {
                // Volver al contenido por defecto para otras secciones
                backToDefault();
                if (section !== 'inicio') {
                    updateMainContent(section);
                }
            }
        }

        // Función para actualizar el contenido principal
        function updateMainContent(section) {
            const defaultContent = document.getElementById('default-content');
            
            let content = '';
            switch(section) {
                case 'inicio':
                    // Restaurar contenido original
                    defaultContent.innerHTML = `
                        <div class="welcome-message">
                            <h1 class="welcome-title">¿Qué tienes para hoy?</h1>
                            <p class="welcome-subtitle">Selecciona una opción para comenzar</p>
                        </div>
                        <div class="content-grid">
                            <div class="content-card" onclick="openResponder()">
                                <h3>Responder</h3>
                                <p>¿Estás listo para asumir el reto?</p>
                            </div>
                            <div class="content-card" onclick="openConsultar()">
                                <h3>Consultar</h3>
                                <p>¿Tienes alguna duda sobre alguno de estos temas?</p>
                            </div>
                        </div>
                    `;
                    return;
                case 'seguimiento':
                    content = `
                        <div class="welcome-message">
                            <h1 class="welcome-title">Seguimiento</h1>
                            <p class="welcome-subtitle">Monitorea el progreso de tus consultas y trámites</p>
                        </div>
                        <div class="content-grid">
                            <div class="content-card">
                                <h3>Consultas Activas</h3>
                                <p>Revisa el estado de tus consultas pendientes</p>
                            </div>
                            <div class="content-card">
                                <h3>Trámites en Proceso</h3>
                                <p>Seguimiento de documentos y solicitudes</p>
                            </div>
                        </div>
                    `;
                    break;
                case 'historial':
                    content = `
                        <div class="welcome-message">
                            <h1 class="welcome-title">Historial</h1>
                            <p class="welcome-subtitle">Revisa tu historial de consultas y actividades</p>
                        </div>
                        <div class="content-grid">
                            <div class="content-card">
                                <h3>Consultas Anteriores</h3>
                                <p>Historial completo de tus consultas</p>
                            </div>
                            <div class="content-card">
                                <h3>Documentos Descargados</h3>
                                <p>Registro de certificados y documentos</p>
                            </div>
                        </div>
                    `;
                    break;
                case 'premios':
                    content = `
                        <div class="welcome-message">
                            <h1 class="welcome-title">Premios</h1>
                            <p class="welcome-subtitle">Conoce tus logros y reconocimientos</p>
                        </div>
                        <div class="content-grid">
                            <div class="content-card">
                                <h3>Mis Logros</h3>
                                <p>Badges y reconocimientos obtenidos</p>
                            </div>
                            <div class="content-card">
                                <h3>Ranking</h3>
                                <p>Tu posición en el sistema de puntos</p>
                            </div>
                        </div>
                    `;
                    break;
                case 'manual':
                    content = `
                        <div class="welcome-message">
                            <h1 class="welcome-title">Manual</h1>
                            <p class="welcome-subtitle">Guías y ayuda para usar el sistema</p>
                        </div>
                        <div class="content-grid">
                            <div class="content-card">
                                <h3>Guía de Usuario</h3>
                                <p>Aprende a usar todas las funciones del sistema</p>
                            </div>
                            <div class="content-card">
                                <h3>Preguntas Frecuentes</h3>
                                <p>Respuestas a las consultas más comunes</p>
                            </div>
                        </div>
                    `;
                    break;
                default:
                    content = `
                        <div class="welcome-message">
                            <h1 class="welcome-title">${section.charAt(0).toUpperCase() + section.slice(1)}</h1>
                            <p class="welcome-subtitle">Contenido de ${section}</p>
                        </div>
                        <div class="content-grid">
                            <div class="content-card">
                                <h3>Opción 1</h3>
                                <p>Descripción de la primera opción</p>
                            </div>
                            <div class="content-card">
                                <h3>Opción 2</h3>
                                <p>Descripción de la segunda opción</p>
                            </div>
                        </div>
                    `;
            }
            
            defaultContent.innerHTML = content;
        }

        // Función para abrir el chat
        function openChat() {
            document.getElementById('default-content').style.display = 'none';
            document.getElementById('responder-content').style.display = 'none';
            document.getElementById('consultar-content').style.display = 'none';
            document.getElementById('chat-interface').style.display = 'flex';
            
            // Inicializar tiempo del mensaje inicial
            if (!document.getElementById('bot-time').textContent) {
                document.getElementById('bot-time').textContent = getCurrentTime();
            }
            
            // Focus en el input del chat
            setTimeout(() => {
                document.getElementById('chat-input').focus();
            }, 100);
        }

        // Función para cerrar el chat
        function closeChat() {
            backToDefault();
        }

        // Función para abrir la interfaz de responder
        function openResponder() {
            document.getElementById('default-content').style.display = 'none';
            document.getElementById('chat-interface').style.display = 'none';
            document.getElementById('consultar-content').style.display = 'none';
            document.getElementById('responder-content').style.display = 'block';
        }

        // Función para abrir la interfaz de consultar
        function openConsultar() {
            document.getElementById('default-content').style.display = 'none';
            document.getElementById('chat-interface').style.display = 'none';
            document.getElementById('responder-content').style.display = 'none';
            document.getElementById('consultar-content').style.display = 'block';
        }

        // Función para volver al contenido por defecto
        function backToDefault() {
            document.getElementById('responder-content').style.display = 'none';
            document.getElementById('consultar-content').style.display = 'none';
            document.getElementById('chat-interface').style.display = 'none';
            document.getElementById('default-content').style.display = 'block';
            
            // Resetear navegación a inicio
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelector('.nav-item').classList.add('active');
        }

        // Función para obtener la hora actual
        function getCurrentTime() {
            const now = new Date();
            return now.toLocaleTimeString('es-ES', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        }

        // Función para enviar mensaje
        function sendMessage() {
            const input = document.getElementById('chat-input');
            const message = input.value.trim();
            
            if (!message) return;
            
            // Agregar mensaje del usuario
            addUserMessage(message);
            
            // Limpiar input
            input.value = '';
            
            // Deshabilitar botón de envío
            document.getElementById('chat-send').disabled = true;
            
            // Mostrar indicador de escritura
            showTypingIndicator();
            
            // Generar respuesta del bot después de un delay
            setTimeout(() => {
                hideTypingIndicator();
                addBotMessage(generateBotResponse(message));
                document.getElementById('chat-send').disabled = false;
                input.focus();
            }, 1500);
        }

        // Función para agregar mensaje del usuario
        function addUserMessage(message) {
            const messagesContainer = document.getElementById('chat-messages');
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message user';
            messageDiv.innerHTML = `
                <div>${message}</div>
                <div class="message-time">${getCurrentTime()}</div>
            `;
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // Guardar en historial
            chatHistory.push({
                type: 'user',
                message: message,
                timestamp: new Date()
            });
        }

        // Función para agregar mensaje del bot
        function addBotMessage(message) {
            const messagesContainer = document.getElementById('chat-messages');
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message bot';
            messageDiv.innerHTML = `
                <div>${message}</div>
                <div class="message-time">${getCurrentTime()}</div>
            `;
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // Guardar en historial
            chatHistory.push({
                type: 'bot',
                message: message,
                timestamp: new Date()
            });
        }

        // Función para generar respuesta del bot
        function generateBotResponse(userMessage) {
            const message = userMessage.toLowerCase();
            
            // Saludos
            if (message.includes('hola') || message.includes('buenos') || message.includes('buenas')) {
                return botResponses.saludo;
            }
            
            // Temas específicos
            if (message.includes('beca')) {
                return botResponses.becas;
            }
            
            if (message.includes('certificado') || message.includes('documento')) {
                return botResponses.certificados;
            }
            
            if (message.includes('nota') || message.includes('calificacion') || message.includes('promedio')) {
                return botResponses.notas;
            }
            
            if (message.includes('matricula') || message.includes('matrícula') || message.includes('inscripcion')) {
                return botResponses.matricula;
            }
            
            if (message.includes('servicio')) {
                return botResponses.servicios;
            }
            
            if (message.includes('influencia') || message.includes('liderazgo')) {
                return botResponses.influencia;
            }
            
            // Despedidas
            if (message.includes('gracias') || message.includes('chao') || message.includes('adiós')) {
                return "¡De nada! Estoy aquí cuando necesites ayuda. Que tengas un excelente día. 😊";
            }
            
            // Respuesta por defecto
            return botResponses.default;
        }

        // Función para mostrar indicador de escritura
        function showTypingIndicator() {
            const indicator = document.getElementById('typing-indicator');
            const messagesContainer = document.getElementById('chat-messages');
            indicator.style.display = 'block';
            messagesContainer.appendChild(indicator);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        // Función para ocultar indicador de escritura
        function hideTypingIndicator() {
            const indicator = document.getElementById('typing-indicator');
            indicator.style.display = 'none';
        }

        // Función para seleccionar rango (para responder)
        function selectRange(range) {
            alert(`Has seleccionado el rango: ${range}`);
            // Aquí puedes agregar la lógica para procesar el rango seleccionado
        }

        // Función para seleccionar módulo (para consultar)
        function selectModule(module) {
            alert(`Has seleccionado el módulo: ${module.toUpperCase()}`);
            // Aquí puedes agregar la lógica para procesar el módulo seleccionado
        }

        // Función para mostrar opciones del menú lateral
        function showOption(option) {
            alert(`Seleccionaste: ${option}`);
        }

        // Función para cerrar sesión
        function logout() {
            if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
                window.location.href = 'index.html';
            }
        }

        // Event listeners
        document.addEventListener('DOMContentLoaded', function() {
            // Enter para enviar mensaje
            document.getElementById('chat-input').addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });

            // Menu toggle para móviles
            document.querySelector('.menu-toggle').addEventListener('click', function() {
                const sidebar = document.querySelector('.sidebar');
                sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
            });

            // Efecto de hover en iconos del header
            document.querySelectorAll('.icon-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 100);
                });
            });
        });