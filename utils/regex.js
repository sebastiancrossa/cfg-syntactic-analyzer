export const match = (string, pattern, replacer) => {
  /* 
    Nos aseguramos, antes de todo, de separar las expresiónes que base a  las uniónes (si es que existen).
    Si solo es una sola expresión, sin una unión, solo vamos a tener un elemento en nuestro arreglo de patrónes a checar.
  */
  let patternsArr = pattern.split("+");

  // Iteramos por nuestro arreglo de patrones y hacemos la búsqueda
  for (let pattern of patternsArr) {
    // Variables que funcionan como apuntadores, ayudandonos con saber en qué parte de la cadena y patrón nos encontramos actualmente.
    let string_idx = 0;
    let pattern_idx = 0;

    // Ir checando cada letra de nuestra cadena de entrada con la cadena actual de nuestra patron de expresion regular
    while (string_idx < string.length) {
      // Primer caso: La letra en posicion actual de la cadena coincide con nuestra letra de la expresion
      // Segundo caso: Que el siguiente caracter sea un *
      if (string[string_idx] === pattern[pattern_idx]) {
        /*
          Valores que indican los rangos de donde tenemos nuestra ocurrencia. Esto para poder pasárselo a nuestra función reemplazadora y que pueda hacer ese remplazo.
        */
        let start = string_idx;
        let end = start;

        // Apuntadores similares a string_idx y pattern_idx, pero se adelantan para checar hasta donde llega la ocurrencia
        let stringChar = string_idx + 1;
        let patternChar = pattern_idx + 1;

        while (patternChar < pattern.length) {
          // Por cada caracter de nuestro patrón, checamos si coincide con el caracter de la cadena
          if (string[stringChar] === pattern[patternChar]) {
            /*
                Checar si ya llegamos al ultimo caracter del patrón. Si sí, significa la subcadena que estamos checando sí cumple con nuestro patrón, por lo que llamos
                a nuestra función de reemplazo.
            */
            if (patternChar === pattern.length - 1) {
              string = spliceSlice(
                string,
                start,
                Math.abs(start - end) + 2,
                replacer
              );

              // Una vez que tenemos el reemplazo, podemos salirnos de este loop, comenzando desde donde terminamos después de hacer el replazo de cadenas
              string_idx = end + 2;
              pattern_idx = 0;
              break;
            } else {
              // Si existe una coincidencia y no estamos en el último caracter de nuestro patrón, aumentamos nuestras apuntadores para seguir checando
              stringChar++;
              patternChar++;
              end++;
            }
          } else {
            // Si no coinciden, checar si ese valor es una *
            if (pattern[patternChar] === "*") {
              // Si sí, checamos los valores anteriores de la cadena hasta que encontremos el valor que no cumpla con la cerradura
              if (string[stringChar] === pattern[patternChar - 1]) {
                end++;
                stringChar++;
              } else {
                // Al llegar al final de las ocurrencias posibles de la cerradura, podemos hacer el remplazo
                // TODO: Abstraer este bloque de código, que también se repite en la la parte de arriba.
                string = spliceSlice(
                  string,
                  start,
                  Math.abs(start - end) + 1,
                  replacer
                );

                string_idx = end + 1;
                pattern_idx = 0;
                break;
              }
            } else {
              // Si no coincide y no nos encontramos en una *, regresamos nuestro apuntador de patrón a 0 y seguimos buscando en la cadena
              string_idx++;
              pattern_idx = 0;
              break;
            }
          }
        }
      } else {
        // Mientras que no haya una coincidencia, seguimos aumentando el indice para pasar por toda la cadena
        string_idx++;
      }
    }
  }

  return string;
};

// Credits to @Louis and @Lorenz Meyer from Stack Overflow for this function
// https://stackoverflow.com/questions/20817618/is-there-a-splice-method-for-strings
function spliceSlice(str, index, count, add) {
  if (index < 0) {
    index = str.length + index;
    if (index < 0) {
      index = 0;
    }
  }

  return str.slice(0, index) + (add || "") + str.slice(index + count);
}
