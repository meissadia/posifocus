/**
 * Returns the last item in an Array
**/
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

/**
 * Save a value to the app state by key
 * @param {string} key - Property Name
 * @param {any} value - Property Value
 * @param {boolean} log - Print debug info to Console
**/
export const sbk = (key, value, log=false) => {
  if(log) {console.log(`Set ${key}:${value}`)};
  this.setState({ [key]: value });
}

export const pathType = () => window.location.pathname.split('/').last();
