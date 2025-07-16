import { defineStore } from 'pinia'

export const useEquipmentStore = defineStore('equipment', {
  state: () => ({
    equipmentList: JSON.parse(localStorage.getItem('equipmentList')) || []
  }),
  
  actions: {
    addEquipment(equipment) {
      this.equipmentList.push({
        id: Date.now(),
        ...equipment
      })
      this.saveToLocalStorage()
    },
    
    updateEquipment(id, updatedEquipment) {
      const index = this.equipmentList.findIndex(item => item.id === id)
      if (index !== -1) {
        this.equipmentList[index] = { ...this.equipmentList[index], ...updatedEquipment }
        this.saveToLocalStorage()
      }
    },
    
    deleteEquipment(id) {
      this.equipmentList = this.equipmentList.filter(item => item.id !== id)
      this.saveToLocalStorage()
    },
    
    saveToLocalStorage() {
      localStorage.setItem('equipmentList', JSON.stringify(this.equipmentList))
      console.log('当前的值为：');
      console.log(this.equipmentList);
      
    }
  },
  
  getters: {
    getEquipmentById: (state) => (id) => {
      return state.equipmentList.find(item => item.id === id)
    }
  }
}) 