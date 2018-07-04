/**
 * config service provider
 *
 * @author Darius Sobczak<darius.sobczak@db-n.com>
 */
class ConfigService {
  /**
   * load configuration json script by node id
   *
   * @param name
   * @returns {Promise<any>}
   */
  load(name) {
    return new Promise((resolve, reject) => {
      const script = document.getElementById(name);

      if (!script) {
        reject('configuration not found');
      }

      const innerText = script.innerHTML;

      try {
        const json = JSON.parse(innerText);

        if (json) {
          resolve(json);
        } else {
          throw 'Configuration not valid';
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
