"use client";
import React, { useState, useCallback } from "react";
import { FiSearch } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Loader2 } from "lucide-react";
import debounce from "lodash/debounce";
import { useSearch } from "@/lib/Apis";

function SearchUserInput() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const { data: users = [], error, isFetching } = useSearch(searchQuery);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <>
      <div className="flex justify-center mb-0">
        <div className="relative w-full">
          <div className="absolute p-2.5 h-full grid items-center text-muted-foreground">
            <FiSearch className="h-5 w-5" />
          </div>
          <input
            type="search"
            readOnly
            placeholder="Search users..."
            onClick={() => setOpen(true)}
            className="w-full h-11 px-10 text-base rounded-lg outline-none border  bg-colorF7 focus:bg-white focus:border-[#3180e1] cursor-pointer placeholder:text-muted-foreground/70"
          />
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Search Users
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <Input
              placeholder="Type here user name or email..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full h-11 text-base"
            />

            <div className="max-h-[400px] overflow-y-auto">
              {error ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <p className="text-muted-foreground mt-2">
                    Error fetching users
                  </p>
                </div>
              ) : isFetching ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-muted-foreground mt-2">Searching...</p>
                </div>
              ) : users.length > 0 ? (
                <div className="space-y-2">
                  {users.map((user: any) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors duration-200"
                      onClick={() => {
                        // Handle user selection here
                        setOpen(false);
                      }}
                    >
                      <img
                        src={user.image || "/default-avatar.png"}
                        alt={user.name}
                        loading="eager"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="text-base font-medium">{user.name}</span>
                    </div>
                  ))}
                </div>
              ) : searchQuery ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FiSearch className="h-12 w-12 text-muted-foreground mb-3" />
                  <p className="text-lg font-medium text-foreground">
                    No users found
                  </p>
                  <p className="text-muted-foreground mt-1">
                    Try searching with a different term
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FiSearch className="h-12 w-12 text-muted-foreground mb-3" />
                  <p className="text-lg font-medium text-foreground">
                    Start typing to search users
                  </p>
                  <p className="text-muted-foreground mt-1">
                    Search results will appear here
                  </p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SearchUserInput;
