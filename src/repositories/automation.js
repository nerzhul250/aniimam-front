import store from '../store/index'

class AutomationRepository{
    getUserInstagramAutomation(){
        return store.dispatch("automation/getUserInstagramAutomation");
    }

    createInstagramAutomationOrder(siteLink){
        let data = {
            siteLink:siteLink,
        }
        return store.dispatch("automation/createInstagramAutomationOrder",data);
    }
}

export default new AutomationRepository();