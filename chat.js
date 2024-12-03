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
            // Saludos y despedidas
            'hola': '¡Hola! Soy el asistente virtual de la librería. ¿En qué puedo ayudarte hoy?',
            'buenos dias': '¡Buenos días! ¿En qué puedo asistirte?',
            'buenas tardes': '¡Buenas tardes! ¿Cómo puedo ayudarte?',
            'buenas noches': '¡Buenas noches! ¿En qué puedo servirte?',
            'adios': '¡Hasta luego! Que tengas un excelente día.',
            'gracias': '¡De nada! Estoy aquí para ayudarte. ¿Hay algo más que necesites?',

            // Preguntas sobre la tienda
            'horario': 'Nuestro horario de atención es de lunes a viernes de 9:00 AM a 8:00 PM, y sábados de 10:00 AM a 6:00 PM. Domingos cerrado.',
            'ubicacion': 'Nos encontramos en [Dirección de tu tienda]. Puedes encontrarnos fácilmente en Google Maps.',
            'envios': 'Realizamos envíos a todo el país. Los tiempos de entrega varían entre 3-5 días hábiles, dependiendo de tu ubicación.',
            'metodos de pago': 'Aceptamos efectivo, tarjetas de crédito/débito, transferencias bancarias y PayPal.',
            'descuentos': 'Tenemos descuentos especiales para estudiantes (15% con credencial vigente) y promociones mensuales en diferentes categorías.',

            // Preguntas sobre productos
            'manga': 'Contamos con una amplia selección de manga de diferentes géneros. ¿Qué tipo de manga te interesa? Tenemos shonen, shoujo, seinen, entre otros.',
            'libros': 'Disponemos de una gran variedad de libros en diferentes géneros: ficción, no ficción, infantil, juvenil, académicos y más. ¿Qué género te interesa?',
            'revistas': 'Tenemos revistas nacionales e internacionales de diversos temas: moda, tecnología, ciencia, entretenimiento y más.',
            'novedades': 'Las últimas novedades incluyen [lista de nuevos títulos]. ¿Te gustaría saber más sobre alguno en particular?',
        
            // Preguntas específicas sobre manga
            'manga shonen': 'En nuestra sección de shonen encontrarás títulos populares como Naruto, One Piece, Dragon Ball, My Hero Academia y muchos más.',
            'manga shoujo': 'En shoujo tenemos títulos como Fruits Basket, Sailor Moon, Nana, y otros romances populares.',
            'manga seinen': 'Nuestra colección seinen incluye títulos como Berserk, Monster, Vagabond y Tokyo Ghoul.',
        
            // Ayuda y soporte
            'ayuda': '¿En qué puedo ayudarte? Puedo brindarte información sobre:\n- Productos disponibles\n- Precios\n- Envíos\n- Métodos de pago\n- Horarios\n- Ubicación\n¿Qué te gustaría saber?',
            'problema': 'Lamento escuchar que tienes un problema. Por favor, describe la situación y haré lo posible por ayudarte o dirigirte con el personal adecuado.',
            'devolucion': 'Nuestra política de devolución permite cambios hasta 15 días después de la compra, presentando el ticket y el producto en buen estado.',
            'garantia': 'Todos nuestros productos tienen garantía contra defectos de fábrica. En caso de algún problema, por favor trae el producto con tu ticket de compra.',

            // Preguntas sobre precios y disponibilidad
            'precio': 'Los precios varían según el producto. ¿Hay algún título específico por el que quieras preguntar?',
            'disponible': '¿Qué título te interesa? Puedo verificar su disponibilidad en nuestro inventario.',
            'reservar': 'Puedes reservar productos llamando a nuestra tienda o a través de nuestra página web. ¿Te gustaría saber más sobre el proceso?',
        
            // Preguntas sobre eventos y comunidad
            'eventos': 'Organizamos eventos mensuales como clubes de lectura, firmas de autores y convenciones de manga. ¿Te gustaría recibir información',

            // Preguntas sobre eventos y comunidad (continuación)
            'eventos': 'Organizamos eventos mensuales como clubes de lectura, firmas de autores y convenciones de manga. ¿Te gustaría recibir información sobre próximos eventos?',
            'club de lectura': 'Nuestro club de lectura se reúne todos los sábados a las 5:00 PM. Cada mes elegimos un libro diferente para discutir. ¿Te gustaría unirte?',
            'firma de autores': 'Regularmente organizamos firmas de autores. El próximo evento será [fecha] con [autor]. ¿Te gustaría más información?',
            'convencion': 'Nuestra próxima convención de manga y anime será el [fecha]. Habrá cosplay, concursos, stands y más. ¿Te interesa participar?',

            // Preguntas específicas sobre títulos
            'bungo stray dogs': 'Bungo Stray Dogs está disponible en nuestra tienda. Tenemos los volúmenes del 1 al 18, cada uno a $15. ¿Te interesa algún volumen en particular?',
            'death note': 'Death Note está disponible en formato individual ($25 por volumen) o en box set completo ($150). ¿Cuál te interesa?',
            'horimiya': 'Horimiya está disponible. Tenemos los 16 volúmenes, cada uno a $15. También tenemos el box set completo. ¿Te gustaría saber más?',

            // Recomendaciones
            'recomienda manga': 'Basado en los gustos populares, te recomiendo:\n- Death Note (Thriller/Misterio)\n- Horimiya (Romance/Slice of Life)\n- Bungo Stray Dogs (Acción/Sobrenatural)\n¿Te gustaría saber más sobre alguno?',
            'manga romance': 'Te recomiendo estos mangas románticos:\n- Horimiya\n- Kamisama Hajimemashita\n- Say "I Love You"\n¿Te gustaría conocer más detalles?',
            'manga accion': 'Para manga de acción, te recomiendo:\n- Seraph of the End\n- Bungo Stray Dogs\n- Death Note\n¿Te interesa alguno?',

            // Preguntas sobre ofertas y promociones
            'ofertas': 'Actualmente tenemos estas ofertas:\n- 2x1 en manga seleccionado\n- 15% de descuento en novelas ligeras\n- 20% off en box sets\n¿Te interesa alguna?',
            'promociones': '¡Tenemos promociones especiales esta semana!\n- Descuento estudiantes\n- Miércoles de 2x1\n- Viernes de envío gratis\n¿Quieres más detalles?',
            'descuento estudiante': 'Con credencial de estudiante vigente obtienes 15% de descuento en toda la tienda. ¿Te gustaría saber cómo aplicarlo?',

            // Preguntas sobre servicios adicionales
            'pedido especial': 'Podemos hacer pedidos especiales de títulos que no tengamos en stock. El tiempo de entrega es de 2-3 semanas. ¿Te gustaría hacer uno?',
            'reserva': 'Puedes reservar títulos próximos a llegar con un 20% de anticipo. ¿Te interesa reservar algún título?',
            'apartado': 'Podemos apartar productos hasta por 1 semana con un 30% de anticipo. ¿Necesitas apartar algo?',

            // Preguntas sobre productos específicos
            'box set': 'Tenemos box sets de varias series populares. Incluyen extras como posters, booklets o postales. ¿Te interesa alguna serie en particular?',
            'edicion especial': 'Contamos con ediciones especiales y limitadas de varios títulos. ¿Hay alguna serie que te interese?',
            'merchandising': 'Tenemos una amplia selección de merchandise: posters, llaveros, figuras, playeras y más. ¿Qué tipo de producto buscas?',

            // Preguntas sobre el sistema de puntos
            'puntos': 'Por cada compra acumulas puntos que puedes canjear por descuentos. ¿Te gustaría conocer tu saldo de puntos?',
            'programa lealtad': 'Nuestro programa de lealtad te da 1 punto por cada $10 de compra. 100 puntos = $10 de descuento. ¿Te gustaría registrarte?',
            'beneficios': '¡Ser miembro te da beneficios exclusivos!\n- Puntos por compras\n- Descuentos especiales\n- Preventas\n¿Quieres saber más?',

            // Preguntas técnicas
            'cuenta': '¿Necesitas ayuda con tu cuenta? Puedo ayudarte con:\n- Registro\n- Inicio de sesión\n- Recuperación de contraseña\n¿Qué necesitas?',
            'pedido': '¿Quieres consultar el estado de tu pedido? Por favor, proporciona tu número de orden.',
            'factura': 'Podemos generar facturas de tus compras. Solo necesitamos tus datos fiscales. ¿Te gustaría solicitar una?',

            // Preguntas sobre géneros específicos
            'yaoi': 'En nuestra sección yaoi/BL encontrarás títulos populares como Given, Sasaki to Miyano, y más. ¿Buscas algún título en particular?',
            'yuri': 'Nuestra colección yuri incluye títulos como Bloom Into You, Citrus, y otros. ¿Te interesa alguno específico?',
            'slice of life': 'En manga slice of life tenemos títulos como Yotsuba&!, Barakamon, y más. ¿Te gustaría algunas recomendaciones?',

            // Respuesta por defecto
            'default': 'Lo siento, no entiendo tu pregunta. ¿Podrías reformularla? Estoy aquí para ayudarte con información sobre nuestra tienda, productos y servicios.',
    
            // Preguntas específicas sobre títulos
            'que trata bungo stray dogs': 'Bungo Stray Dogs es una serie que mezcla acción y sobrenatural. Sigue a Atsushi Nakajima, quien se une a una agencia de detectives con poderes especiales. Tenemos disponibles los volúmenes 1-18 a $15 cada uno. ¿Te interesa comenzar la serie?',
            
            'me puedes contar sobre death note': 'Death Note es un thriller psicológico que sigue a Light Yagami, quien encuentra un cuaderno sobrenatural que le permite matar a cualquiera escribiendo su nombre. La serie explora temas de justicia y moralidad. Disponible en volúmenes individuales ($25) o box set completo ($150).',
            
            'de que se trata horimiya': 'Horimiya es una historia romántica slice of life sobre dos estudiantes, Hori y Miyamura, que descubren sus verdaderas personalidades fuera de la escuela. Es perfecta si buscas una historia dulce con excelente desarrollo de personajes. Todos los volúmenes están disponibles a $15.',
            
            'cual es la trama de toilet bound hanako kun': 'Toilet-Bound Hanako-kun mezcla comedia, sobrenatural y misterio. Sigue a Nene Yashiro, quien invoca al espíritu escolar Hanako-kun y se ve envuelta en el mundo de los "Siete Misterios" de la escuela. Cada volumen cuesta $20.',
            
            // Recomendaciones detalladas por género
            'busco manga de romance con drama': 'Te recomiendo estas series con romance y drama:\n1. Kamisama Hajimemashita - Romance sobrenatural con desarrollo profundo\n2. Say "I Love You" - Drama escolar realista\n3. My Little Monster - Romance con personajes únicos\n¿Te gustaría detalles de alguna?',
            
            'quiero un manga de accion con buena historia': 'Estas son excelentes opciones de acción con tramas elaboradas:\n1. Bungo Stray Dogs - Acción sobrenatural con misterio\n2. Seraph of the End - Acción post-apocalíptica con vampiros\n3. Death Note - Thriller psicológico intenso\n¿Cuál te llama más la atención?',
            
            'recomiendame mangas de terror': 'Para los fans del terror, recomiendo:\n1. Another - Terror psicológico en ambiente escolar\n2. Elfen Lied - Terror con elementos sci-fi\n3. Satsuriku no Tenshi - Terror y supervivencia\nCada uno tiene un estilo único de horror. ¿Te interesa alguno en particular?',
            
            // Preguntas sobre géneros específicos con detalles
            'que mangas de romance tienen final feliz': 'Si buscas romances con finales felices, te recomiendo:\n1. Horimiya - Romance dulce y satisfactorio\n2. Kamisama Hajimemashita - Romance sobrenatural con final completo\n3. Say "I Love You" - Desarrollo realista con buen cierre\n¿Te gustaría saber más de alguno?',
            
            'cuales son los mejores mangas de accion que tienes': 'Nuestros mangas de acción más populares son:\n1. Bungo Stray Dogs - Excelente mezcla de acción y poderes\n2. Seraph of the End - Acción intensa con gran arte\n3. Death Note - Thriller con acción psicológica\nTodos tienen calificaciones de 4.5+ estrellas. ¿Cuál te interesa?',
            
            // Recomendaciones basadas en otros títulos
            'si me gusta death note que me recomiendas': 'Si disfrutaste Death Note, te recomendaría:\n1. Another - Similar atmósfera de misterio\n2. Bungo Stray Dogs - Elementos detectivescos\n3. Monster - Thriller psicológico maduro\nTodos mantienen ese elemento de suspenso e inteligencia. ¿Te gustaría explorar alguno?',
            
            'busco algo parecido a horimiya': 'Si te gustó Horimiya, te encantarán:\n1. Say "I Love You" - Romance escolar realista\n2. My Little Monster - Romance con personajes carismáticos\n3. Kamisama Hajimemashita - Romance con desarrollo profundo\n¿Quieres que te cuente más sobre alguno?',
            
            // Preguntas sobre disponibilidad y estado de series
            'cuando sale el siguiente volumen': '¿De qué serie te interesa saber? Puedo verificar las fechas de lanzamiento y si tenemos preventas disponibles.',
            
            'tienen todos los volumenes': '¿De qué serie necesitas saber? Puedo verificar nuestro inventario actual y próximas llegadas.',
            
            // Recomendaciones personalizadas
            'quiero empezar a leer manga': 'Para comenzar en el mundo del manga, te sugiero estas series según tu interés:\n1. Para acción: My Hero Academia - Fácil de seguir y emocionante\n2. Para romance: Horimiya - Historia dulce y accesible\n3. Para misterio: Death Note - Cautivador desde el inicio\n¿Qué género te llama más la atención?',
            
            'manga para principiantes': 'Excelentes mangas para comenzar:\n1. Death Note - Historia atrapante y fácil de seguir\n2. Horimiya - Romance realista y bien narrado\n3. Bungo Stray Dogs - Acción con buena introducción a los personajes\n¿Te gustaría saber más sobre alguno?',
    
            // Default response
            'default': 'Disculpa, no he entendido completamente tu pregunta. ¿Podrías darme más detalles sobre lo que buscas? Puedo ayudarte con recomendaciones, información sobre series específicas o géneros que te interesen.'
        };
    
        message = message.toLowerCase();
        
        // Check for matches in the responses object
        for (let key in responses) {
            if (message.includes(key)) {
                return responses[key];
            }
        }
        
        // Check for more complex patterns
        if (message.includes('recomendar') || message.includes('sugerir')) {
            if (message.includes('terror') || message.includes('horror')) {
                return responses['recomiendame mangas de terror'];
            } else if (message.includes('romance')) {
                return responses['busco manga de romance con drama'];
            } else if (message.includes('accion')) {
                return responses['quiero un manga de accion con buena historia'];
            }
        }
        
        if (message.includes('parecido') || message.includes('similar')) {
            if (message.includes('death note')) {
                return responses['si me gusta death note que me recomiendas'];
            } else if (message.includes('horimiya')) {
                return responses['busco algo parecido a horimiya'];
            }
        }
        
        return responses['default'];
    }
});