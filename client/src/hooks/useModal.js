import {useState} from "react";

// modal window
export default function useModal() {
    const [modalVisible, setModalVisible] = useState(false)

    return {
        modalVisible: modalVisible,
        closeModal: () => setModalVisible(false),
        showAModal: () => setModalVisible(true),
    }
}