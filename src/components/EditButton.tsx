interface EditButtonProps<T> {
    id: T;
    handleEdit: (id: T) => void;
};

export default function DeleteButton<T>({ id, handleEdit }:  EditButtonProps<T> ) {
    return (
        <button 
            className=" bg-amber-400 px-2 py-1 rounded-lg text-white"
            onClick={() => handleEdit(id)}
        >
           แก้ไข 
        </button>
    )

};