function createEventEmitter(){
    const listenerMap = {}

    return {
        on( eventName , listener){
            listenerMap[eventName] = (listenerMap[eventName]) ? [...listenerMap[eventName], listener] : [listener]
            return () => {
                listenerMap[eventName] = listenerMap[eventName].filter(func => func !== listener)
            }
        },

        emit(eventName, data){
            if ( !listenerMap[eventName]) return
            listenerMap[eventName].forEach(
                listener => listener(data))
        }

    }
}

export const eventBusService = createEventEmitter()

function showUserMsg(msg){
    eventBusService.emit('show-user-msg', msg)
}
export function showSuccessMsg(txt){
    showUserMsg({ txt, type: 'success' })
}

export function showErrorMsg(txt){
    showUserMsg({ txt, type: 'error' })
}