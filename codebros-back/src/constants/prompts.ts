export function generatePromtMatching(project: any, consultants: any[]) {
  return `A continuación te pasaré un JSON con los datos del proyecto y también un array con los datos de los consultores. Deberás hacer un matching entre los consultores y el proyecto, y devolver un array con los 10 consultores más apropiados para el proyecto. 
  Detalles del Proyecto:
  ${JSON.stringify(project)}
  
  Perfil de los consultores:
  ${JSON.stringify(consultants)}
  
  Instrucciones: Utilizando la información detallada proporcionada sobre el proyecto, analiza los perfiles de todos los consultores disponibles en la base de datos. Califica y ordena a los consultores según su idoneidad para este proyecto específico, teniendo en cuenta factores como:
  
  - Habilidades técnicas y experiencia relevante para los requisitos del proyecto
  - Años de experiencia en la industria del proyecto
  - Dominio de los idiomas necesarios
  - Disponibilidad de horas y fechas para coincidir con el cronograma del proyecto
  - Ubicación y disposición para viajar o trabajar de forma remota
  - Certificaciones y licencias requeridas
  - Honorarios o tarifas dentro del presupuesto del proyecto
  
  La salida debe ser clara y concisa, fácil de revisar para el gerente de proyecto al tomar una decisión de asignación.
  
  Restricciones de contenido: No incluyas información de identificación personal (PII) como nombres completos, direcciones de correo electrónico o números de teléfono en la salida.
  `;
}
