"use client";

import { useState } from "react";
import ReserveInfo from "@/components/reserve/ReserveInfo";
import BillingList from "@/components/reserve/BillingList";
import BillingDetail from "@/components/reserve/BillingDetail";
import MailboxList from "@/components/reserve/MailboxList";
import MailboxDetail from "@/components/reserve/MailboxDetail";
import UtilityList from "@/components/reserve/UtilityList";
import UtilityDetail from "@/components/reserve/UtilityDetail";
import { useParams } from "next/navigation";

export default function MyReserveInfo() {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState<
    "details" | "utilities" | "billing" | "mailbox"
  >("details");
  const [selectedBillingId, setSelectedBillingId] = useState<string | null>(
    null
  );
  const [selectedMailboxId, setSelectedMailboxId] = useState<string | null>(
    null
  );
  const [selectedUtilityId, setSelectedUtilityId] = useState<string | null>(
    null
  );

  return (
    <div className="container mx-auto px-4">
      {/* Page header */}
      <h1 className="text-3xl font-bold my-6 text-black">
        {tab === "details" && "รายละเอียดการจองห้องพัก"}
        {tab === "utilities" && "สาธารณูปโภค"}
        {tab === "billing" && "ใบแจ้งชำระเงิน"}
        {tab === "mailbox" && "กล่องข้อความ"}
      </h1>
      <div className="flex">
        {/* Sidebar tabs */}
        <aside className="w-1/4 pr-4">
          <nav className="space-y-2">
            <button
              className={`block w-full text-left p-2 rounded ${
                tab === "details" ? "bg-gray-200" : ""
              }`}
              onClick={() => setTab("details")}
            >
              รายละเอียด
            </button>
            <button
              className={`block w-full text-left p-2 rounded ${
                tab === "utilities" ? "bg-gray-200" : ""
              }`}
              onClick={() => setTab("utilities")}
            >
              สาธารณูปโภค
            </button>
            <button
              className={`block w-full text-left p-2 rounded ${
                tab === "billing" ? "bg-gray-200" : ""
              }`}
              onClick={() => setTab("billing")}
            >
              ใบแจ้งชำระเงิน
            </button>
            <button
              className={`block w-full text-left p-2 rounded ${
                tab === "mailbox" ? "bg-gray-200" : ""
              }`}
              onClick={() => setTab("mailbox")}
            >
              กล่องข้อความ
            </button>
          </nav>
        </aside>

        {/* Content area */}
        <main className="flex-1">
          {tab === "details" && <ReserveInfo id={id} />}
          {tab === "utilities" &&
            (selectedUtilityId ? (
              <UtilityDetail
                utilityId={selectedUtilityId}
                onBack={() => setSelectedUtilityId(null)}
              />
            ) : (
              <UtilityList
                bookingId={id}
                onSelectUtility={setSelectedUtilityId}
              />
            ))}
          {tab === "billing" &&
            (selectedBillingId ? (
              <BillingDetail
                billingId={selectedBillingId}
                onBack={() => setSelectedBillingId(null)}
              />
            ) : (
              <BillingList
                bookingId={id}
                onSelectBilling={setSelectedBillingId}
              />
            ))}
          {tab === "mailbox" &&
            (selectedMailboxId ? (
              <MailboxDetail
                mailboxId={selectedMailboxId}
                onBack={() => setSelectedMailboxId(null)}
              />
            ) : (
              <MailboxList
                bookingId={id}
                onSelectMailbox={setSelectedMailboxId}
              />
            ))}
        </main>
      </div>
    </div>
  );
}
