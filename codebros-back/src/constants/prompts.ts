export function generatePromtMatching(project: any, consultants: any[]) {
  return `A continuación te pasaré un JSON con los datos del proyecto y también un array con los datos de los consultores. Deberás hacer un matching entre los consultores y el proyecto, y devolver los consultores más apropiados para el proyecto.
  La cantidad de consultores que devuelvas depende si en el proyecto se especifíca el tamaño del equipo o de otro modo es a tu criterio, pero recuerda que deben ser los más apropiados para el proyecto. 


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
  
  Devuelva un array de JSON que describa el perfil de los consultores, las ventajas, desventajas y el porcentaje de emparejamiento con el proyecto utilizando el siguiente esquema:
    
    [
      {
        "id": "string",
        "name": "string",
        "profile": {
          "skills": [
            {
              "name": "string",
              "level": "string"
            }
          ],
          "languages": [
            {
              "name": "string",
              "level": "string"
            }
          ],
          "availability": "string",
          "location": "string",
          "certifications": [
            "string"
          ],
          "fee": "number"
        },
        "advantages": [
          "string"
        ],
        "disadvantages": [
          "string"
        ],
        "matchPercentage": "number"
      }
    ]

    Todos los campos son obligatorios. 
    Importante: solo devuelva una única pieza de texto JSON válido.
  `;
}
