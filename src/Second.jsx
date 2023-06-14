import React, { useState } from 'react';

const Second = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', top: 0, left: 0 },
    { id: 2, name: 'Item 2', top: 0, left: 0 },
    { id: 3, name: 'Item 3', top: 0, left: 0 },
    { id: 4, name: 'Item 4', top: 0, left: 0 },
    { id: 5, name: 'Item 5', top: 0, left: 0 },
    { id: 6, name: 'Item 6', top: 0, left: 0 },
    { id: 7, name: 'Item 7', top: 0, left: 0 },
    { id: 8, name: 'Item 8', top: 0, left: 0 },
    { id: 9, name: 'Item 9', top: 0, left: 0 },
    { id: 10, name: 'Item 10', top: 0, left: 0 },
  ]);

  const handleDragStart = (event, item) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', ''); // Необходимо для поддержки Firefox

    setIsDragging(true);
    setDraggedItem(item);
  };

  const handleDragEnd = (event) => {
    console.log(event,)
    //
    const updatedCards = items.map((card) => {
      if (card.id === draggedItem?.id) {
        const newLeft = event.clientX;
        const newTop = event.clientY;

        // const boundedLeft = Math.max(0, Math.min(newLeft, window.innerWidth - 200));
        // const boundedTop = Math.max(0, Math.min(newTop, window.innerHeight - 200));

        return {
          ...card,
          left: newLeft -100,
          top: newTop - 100
        };
      }
      return card;
    });
    setItems(updatedCards);
    //
    setIsDragging(false);
    setDraggedItem(null);
  };

  // const handleDragEnter = (event, index) => {
  //   if (event.target !== event.currentTarget) {
  //     return;
  //   }

  //   if (draggedItem) {
  //     const updatedItems = [...items];
  //     updatedItems.splice(index, 0, updatedItems.splice(draggedItem.index, 1)[0]);
  //     setItems(updatedItems);
  //     setDraggedItem({ ...draggedItem, index });
  //   }
  // };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (event, index) => {
    event.preventDefault();

    if (draggedItem) {
      const updatedItems = [...items];
      updatedItems[draggedItem.index].top = 0;
      updatedItems[draggedItem.index].left = 0;
      setItems(updatedItems);
      setDraggedItem(null);
    }
  };

  return (
    <div>
      {items.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={(event) => handleDragStart(event, { ...item, index })}
          onDragEnd={(event)=>handleDragEnd(event)}
          style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            // display:isDragging && draggedItem && draggedItem.id === item.id ? 'none' : 'block',
            // opacity:isDragging && draggedItem && draggedItem.id === item.id ? '0':'1',
            position: 'absolute',
            top: item.top,
            left: item.left,
            cursor: isDragging && draggedItem && draggedItem.id === item.id ? '' : '',
            width: '200px',
            height: '200px',
            background: 'lightblue',
            border: '1px solid black',
            borderRadius: '4px',
          }}
        >
          <div
           style={{
            width:'10px',
            height:'10px',
            backgroundColor:'red',
            borderRadius:'100%',
           }}
          >   
          </div>
        </div>
      ))}
      {/* <div
        onDragEnter={(event) => handleDragEnter(event, items.length)}
        onDragOver={handleDragOver}
        onDrop={(event) => handleDrop(event, items.length)}
        style={{
          border: '1px dashed gray',
          minHeight: '100px',
          marginTop: '20px'
        }}
      >
        Drop Area
      </div> */}
    </div>
  );
};

export default Second;
