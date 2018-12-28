export default class CleverManager{
    protected static instance:CleverManager = null;

    public static getInstance():CleverManager{
        if (!CleverManager.instance) {
            CleverManager.instance = new CleverManager();
        }
        return CleverManager.instance;
    }

    private constructor(){
        
    }
}
