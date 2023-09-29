export class SpanishIdValidator {
        private static DNI_REGEX = /^(\d{8})([A-Z])$/;
        private static NIE_REGEX = /^[XYZ]\d{7,8}[A-Z]$/;
      
        static validateSpanishID(str: string): { type: string, valid: boolean } {
      
          // Asegúrate de que esté en mayúsculas y sin espacios en blanco
          str = str.toUpperCase().replace(/\s/g, '');
      
          let valid = false;
          let type = this.spainIdType(str);
          console.log(type)
          switch (type) {
            case 'dni':
              valid = this.validDNI(str);
              break;
            case 'nie':
              valid = this.validNIE(str);
              break;
          }
      
          return {
            type: type,
            valid: valid
          };
      
        }
      
        private static spainIdType(str: string): string {
          if (str.match(this.DNI_REGEX)) {
            return 'dni';
          }
          if (str.match(this.NIE_REGEX)) {
            return 'nie';
          }
          return '';
        }
      
        private static validDNI(dni: string): boolean {
          const dni_letters = "TRWAGMYFPDXBNJZSQVHLCKE";
          const letter = dni_letters.charAt(parseInt(dni, 10) % 23);
      
          return letter == dni.charAt(8);
        }
      
        private static validNIE(nie: string): boolean {
      
          // Cambia la letra inicial por el número correspondiente y valida como DNI
          let nie_prefix = nie.charAt(0);
      
          switch (nie_prefix) {
            case 'X':
              nie_prefix = '0';
              break;
            case 'Y':
              nie_prefix = '1';
              break;
            case 'Z':
              nie_prefix = '2';
              break;
          }
          return this.validDNI(nie_prefix + nie.substr(1));
        }
}
