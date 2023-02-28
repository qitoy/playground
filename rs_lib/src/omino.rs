use std::collections::HashSet;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone)]
enum OminoState {
    Use,
    Queue,
    Unuse,
}

type OminoStates = Vec<(OminoState, i32, i32)>;

#[wasm_bindgen]
pub struct GenOmino {
    states: OminoStates,
    set: HashSet<(i32, i32)>,
    buffer: Vec<OminoStates>,
}

#[wasm_bindgen]
impl GenOmino {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            states: vec![(OminoState::Queue, 0, 0)],
            set: HashSet::from_iter([(0, 0)]),
            buffer: vec![],
        }
    }

    pub fn build(&mut self, n: usize) -> usize {
        self.dfs(n);
        self.buffer.len()
    }

    pub fn get(&self, n: usize) -> Vec<i32> {
        let states = self.buffer.get(n).unwrap();
        let mut ret = Vec::new();
        for (state, x, y) in states.iter() {
            ret.push(
                match state {
                    OminoState::Use => 0,
                    OminoState::Queue => 1,
                    OminoState::Unuse => 2,
                }
            );
            ret.push(*x);
            ret.push(*y);
        }
        ret
    }

    fn dfs(&mut self, n: usize) {
        self.buffer.push(self.states.to_vec());
        if n == 0 {
            return;
        }
        let len = self.states.len();
        for i in 0..len {
            if let (OminoState::Queue, x, y) = self.states[i] {
                self.states[i] = (OminoState::Use, x, y);
                for (dx, dy) in [(0,-1), (-1,0), (1,0), (0,1)] {
                    let (nx, ny) = (x+dx, y+dy);
                    if !self.set.contains(&(nx, ny)) && (ny >= 1 || ny == 0 && nx >= 0)  {
                        self.states.push((OminoState::Queue, nx, ny));
                        self.set.insert((nx, ny));
                    }
                }
                self.dfs(n-1);
                self.states[i] = (OminoState::Unuse, x, y);
                for j in len..self.states.len() {
                    let (_, x, y) = self.states[j];
                    self.set.remove(&(x, y));
                }
                self.states.truncate(len);
                for j in i+1..len {
                    if let (OminoState::Unuse, x, y) = self.states[j] {
                        self.states[j] = (OminoState::Queue, x, y);
                    }
                }
                self.buffer.push(self.states.to_vec());
            }
        }
    }
}
