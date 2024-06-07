

// Verificar si ya se ha mostrado el mensaje
if (!localStorage.getItem('mensajeMostrado')) {
    // Recargar la página
    location.reload();
    
    // Mostrar un mensaje después de recargar la página
    alert('La página ha sido recargada');
    
    // Marcar que el mensaje ya ha sido mostrado
    localStorage.setItem('mensajeMostrado', 'true');
  }