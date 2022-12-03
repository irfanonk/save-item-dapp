import React, { useContext, useEffect, useState } from "react";
import { web3Context } from "../context/web3Context";
import { fromBNtoString } from "../utils/etherUtils";
import ItemCard from "../components/ItemCard";
import { CircularProgress, Stack } from "@mui/material";

export default function DisplayItems() {
  const { getAddressItemCount, getItem, account } = useContext(web3Context);
  console.log("account", account);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (account) {
      (async () => {
        try {
          const _itemsCount = await getAddressItemCount(account);
          console.log("_itemsCount", fromBNtoString(_itemsCount));

          if (_itemsCount === 0) return;

          let _items = [];

          for (let index = 0; index < _itemsCount; index++) {
            const _item = await getItem(account, index);
            console.log("_item", _item);
            _items.push(_item);
            setItems([..._items]);
          }
        } catch (error) {
          console.log("error", error);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [account]);

  if (!account) {
    return <div>Please connect metamask</div>;
  }

  return (
    <Stack display="flex" flexDirection="row" gap={5} p={10}>
      {isLoading ? (
        <CircularProgress />
      ) : items.length === 0 ? (
        "No items found"
      ) : (
        items.map((item) => {
          return (
            <Stack>
              <ItemCard key={item.imageUri} item={item} />
            </Stack>
          );
        })
      )}
    </Stack>
  );
}
