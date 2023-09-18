'use client';
import Image from 'next/image';
import {
  StateMachineProvider,
  createStore,
  useStateMachine,
} from 'little-state-machine';

interface DetailProps {
  name: string;
  age: number;
}

createStore(
  {
    theDetail: { name: 'bill', age: 16 },
  },
  {
    persist: 'action',
    storageType: localStorage,
  }
);

// function updateName(state: { theDetail: DetailProps }, payload: DetailProps) {
//   return {
//     ...state,
//     theDetail: {
//       ...state.theDetail,
//       ...payload,
//     },
//   };
// }

//update name but retain the age
function updateName(state: { theDetail: DetailProps }, payload: DetailProps) {
  return {
    ...state,
    theDetail: {
      ...state.theDetail,
      name: payload.name,
    },
  };
}

//increment age by 1
function incrementAge(state: { theDetail: DetailProps }) {
  return {
    ...state,
    theDetail: {
      ...state.theDetail,
      age: state.theDetail.age + 1,
    },
  };
}

function FirstComponent() {
  const { actions, state } = useStateMachine({ updateName, incrementAge });

  return (
    <div>
      <div
        onClick={() => {
          actions.updateName({ name: 'billy', age: 16 });
        }}
      >
        <div className='text-gray-600 hover:text-gray-100'>
          {state.theDetail.name}
        </div>
      </div>
      <div>
        <div onClick={() => actions.incrementAge()}>{state.theDetail.age}</div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className='items-center justify-center p-16'>
      <StateMachineProvider>
        <FirstComponent />
      </StateMachineProvider>
    </div>
  );
}
