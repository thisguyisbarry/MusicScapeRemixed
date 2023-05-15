const test = {
    async getHello() {
      const response = await fetch('/api');
      const data = await response.json();
      return data.message || "failed";
    }
  }
  
export default test;  