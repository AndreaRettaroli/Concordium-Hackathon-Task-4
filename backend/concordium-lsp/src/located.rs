use std::ops::DerefMut;

use concordium_rust_sdk::types::smart_contracts::concordium_contracts_common::AccountAddress;
use concordium_rust_sdk::types::AccountInfo;

/*
Parsed account together with location key concept.
For example ProgramAccount or CpiAccount from anchor.
 */
pub trait Located<T> {
    fn as_ref(&self) -> &T;
    fn as_mut(&mut self) -> &mut T;
    fn key(&self) -> AccountAddress;
}

impl<T> Located<T> for dyn AccountINfo + DerefMut<Target=T>
{
    fn as_ref(&self) -> &T {
        self.deref()
    }

    fn as_mut(&mut self) -> &mut T {
        self.deref_mut()
    }

    fn key(&self) -> AccountAddress {
        *self.account_address
    }
}
