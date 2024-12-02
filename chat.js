document.addEventListener('DOMContentLoaded', function() {
    const chatModal = document.getElementById('chatbox');
    const messageArea = document.querySelector('.messages__history');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');

    // Mensaje de bienvenida cuando se abre el modal
    chatModal.addEventListener('shown.bs.modal', function () {
        if (!messageArea.hasChildNodes()) {
            addMessage('operator', '¡Hola! ¿En qué puedo ayudarte?');
        }
        chatInput.focus();
    });

    // Enviar mensaje al hacer clic en el botón
    sendButton.addEventListener('click', sendMessage);

    // Enviar mensaje al presionar Enter
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage('visitor', message);
            chatInput.value = '';
            
            // Simular respuesta del bot
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                addMessage('operator', botResponse);
            }, 1000);
        }
    }

    function addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `messages__item messages__item--${sender}`;
        messageDiv.textContent = text;
        messageArea.appendChild(messageDiv);
        messageArea.scrollTop = messageArea.scrollHeight;
    }

    function getBotResponse(message) {
        const responses = {
            'hola': '¡Hola! ¿En qué puedo ayudarte?',
            'ayuda': '¿Con qué necesitas ayuda? Puedo asistirte con información sobre libros, manga, revistas o la tienda.',
            'gracias': '¡De nada! ¿Hay algo más en lo que pueda ayudarte?'
        };

        message = message.toLowerCase();
        for (let key in responses) {
            if (message.includes(key)) {
                return responses[key];
            }
        }
        
        return "Lo siento, no entiendo tu pregunta. ¿Podrías reformularla?";
    }
});