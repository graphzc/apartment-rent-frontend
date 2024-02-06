interface EditButtonProps {
    id: string;
    handleEdit: (id: string) => void;
};

export default function DeleteButton({ id, handleEdit }:  EditButtonProps ) {
    return (
        <button 
            className=" bg-amber-400 px-2 py-1 rounded-lg text-white"
            onClick={() => handleEdit(id)}
        >
           แก้ไข 
        </button>
    )

};