use std::io::Cursor;
use std::convert::TryFrom;

use borsh::BorshSchema;
use concordium_rust_sdk::types::smart_contracts::concordium_contracts_common::{ AccountAddress, Serial, Deserial };

use crate::error::CommonError;

#[derive(Default, Clone, BorshSchema, Debug)]
pub struct List {
    pub account: AccountAddress,
    pub item_size: u32,
    pub count: u32,
    pub new_account: AccountAddress,
    pub copied_count: u32,
}

impl List {
    pub fn new(
        discriminator: &[u8; 8],
        item_size: u32,
        account: AccountAddress,
        data: &mut [u8],
        list_name: &str,
    ) -> Result<Self, ProgramError> {
        let result = Self {
            account,
            item_size,
            count: 0,
            new_account: AccountAddress::default(),
            copied_count: 0,
        };
        result.init_account(discriminator, data, list_name)?;
        Ok(result)
    }

    pub fn bytes_for(
        item_size: u32,
        count: u32,
    ) -> u32 {
        8 + count * item_size
    }

    pub fn capacity_of(
        item_size: u32,
        account_len: usize,
    ) -> u32 {
        (account_len as u32 - 8) / item_size
    }

    fn init_account(
        &self,
        discriminator: &[u8; 8],
        data: &mut [u8],
        list_name: &str,
    ) -> ProgramResult {
        assert_eq!(self.count, 0);
        if data.len() < 8 {
            /*
            msg!(
                "{} account must have at least 8 bytes of storage",
                list_name
            );
            return Err(ProgramError::AccountDataTooSmall);
             */
        }
        if data[0..8] != [0; 8] {
            /*
            msg!("{} account is already initialized", list_name);
            return Err(ProgramError::AccountAlreadyInitialized);
             */
        }

        data[0..8].copy_from_slice(discriminator);
        Ok(())
    }

    /*
    pub fn check_account<'info>(
        &self,
        account: &AccountInfo<'info>,
        list_name: &str,
    ) -> ProgramResult {
        check_address(account.key, &self.account, list_name)?;
        let data = account.data.borrow();
        if data.len() < 8 {
            msg!(
                "{} account must have at least 8 bytes of storage",
                list_name
            );
            return Err(ProgramError::AccountDataTooSmall);
        }
        if data[0..8] != D::discriminator() {
            msg!(
                "{} account must have discriminator {:?}. Got {:?}",
                list_name,
                D::discriminator(),
                &data[0..8]
            );
            return Err(ProgramError::InvalidAccountData);
        }
        Ok(())
    }
     */

    pub fn item_size(&self) -> u32 {
        self.item_size
    }

    pub fn len(&self) -> u32 {
        self.count
    }

    pub fn is_empty(&self) -> bool {
        self.count == 0
    }

    pub fn is_changing_account(&self) -> bool {
        self.new_account != AccountAddress.default()
    }

    pub fn capacity(
        &self,
        account_len: usize,
    ) -> Result<u32, ProgramError> {
        Ok(u32::try_from(
            account_len
                .checked_sub(8)
                .ok_or(ProgramError::AccountDataTooSmall)?, // TODO: Change to concordium-like error
        )
            .map_err(|_| ProgramError::from(CommonError::CalculationFailure))? // TODO: Change to concordium-like error
            .checked_div(self.item_size())
            .unwrap_or(u32::MAX)
        )
    }

    pub fn get<I: Deserial>(
        &self,
        data: &[u8],
        index: u32,
        list_name: &str,
    ) -> Result<I, String> {
        if index >= self.len() {
            /*
            msg!(
                "list {} index out of bounds ({}/{})",
                list_name,
                index,
                self.len()
            );
             */
            return Err(ProgramError::InvalidArgument);
        }
        let start = 8 + (index * self.item_size()) as usize;
        I::deserial(&mut &data[start..(start + self.item_size() as usize)])
            .map_err(|err| err.to_string())
    }

    pub fn set<I: Serial>(
        &self,
        data: &mut [u8],
        index: u32,
        item: I,
        list_name: &str,
    ) -> ProgramResult {
        if self.new_account != AccountAddress::default() {
            // msg!("Can not modify list {} while changing list's account");
            return Err(ProgramError::InvalidAccountData);
        }
        if index >= self.len() {
            // msg!(
            //     "list {} index out of bounds ({}/{})",
            //     list_name,
            //     index,
            //     self.len()
            // );
            return Err(ProgramError::InvalidArgument);
        }
        let start = 8 + (index * self.item_size()) as usize;
        let mut cursor = Cursor::new(&mut data[start..(start + self.item_size() as usize)]);
        item.serial(&mut cursor)?;

        Ok(())
    }

    pub fn push<I: Serial> (
        &mut self,
        data: &mut [u8],
        item: I,
        list_name: &str,
    ) -> ProgramResult {
        if self.new_account != AccountAddress::default() {
            msg!("Can not modify list {} while changing list's account");
            return Err(ProgramError::InvalidAccountData);
        }
        let capacity = self.capacity(data.len())?;
        if self.len() >= capacity {
            msg!("list {} with capacity {} is full", list_name, capacity);
            return Err(ProgramError::AccountDataTooSmall);
        }

        let start = 8 + (self.len() * self.item_size()) as usize;
        let mut cursor = Cursor::new(&mut data[start..(start + self.item_size() as usize)]);
        item.serial(&mut cursor)?;

        self.count += 1;

        Ok(())
    }

    pub fn remove(
        &mut self,
        data: &mut [u8],
        index: u32,
        list_name: &str,
    ) -> ProgramResult {
        if self.new_account != AccountAddress::default() {
            msg!("Can not modify list {} while changing list's account");
            return Err(ProgramError::InvalidAccountData);
        }
        if index >= self.len() {
            msg!(
                "list {} remove out of bounds ({}/{})",
                list_name,
                index,
                self.len()
            );
            return Err(ProgramError::InvalidArgument);
        }

        self.count -= 1;
        if index == self.count {
            return Ok(());
        }
        let start = 8 + (index * self.item_size()) as usize;
        let last_item_start = 8 + (self.count * self.item_size()) as usize;
        data.copy_within(
            last_item_start..last_item_start + self.item_size() as usize,
            start,
        );

        Ok(())
    }
}
